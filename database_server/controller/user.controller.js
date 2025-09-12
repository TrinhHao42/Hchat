const User = require('../models/User');
const Chatroom = require('../models/Chatroom');

const getUserByEmailAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ U_email: { $regex: `^${email}$`, $options: 'i' } })

    if (!user) {
      return res.status(401).json({ message: 'Không tìm thấy người dùng' })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' })
    }

    const { U_user_name, U_avatar, U_contacts, U_email } = user.toObject()

    return res.status(200).json({ U_user_name, U_avatar, U_contacts, U_email })
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' })
  }
}

const registerNewUser = async (req, res) => {
  try {
    const { user } = req.body

    const newUser = new User(user)

    const savedUser = await newUser.save()

    return res.status(201).json({
      message: 'Tạo người dùng thành công',
      user: savedUser
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Tên người dùng hoặc email đã tồn tại' })
    }
    return res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' })
  }
}

const getUserByToken = async (req, res) => {
  const { email } = req.body

  if (!email)
    return res.status(401).json({ message: 'missing email' })

  await User.findOne(
    { U_email: { $regex: `^${email}$`, $options: 'i' } },
    { _id: 0, U_user_name: 1, U_email: 1, U_avatar: 1, U_contacts: 1 }
  )
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => res.status(500).json({ message: `lỗi server: ${error.message}` }))
}

// Search users
const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const users = await User.find({
      $or: [
        { U_user_name: { $regex: query, $options: 'i' } },
        { U_email: { $regex: query, $options: 'i' } }
      ]
    }).select('_id U_user_name U_avatar U_email');

    res.status(200).json(users);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Lỗi khi tìm kiếm người dùng' });
  }
};

// Send friend request
const sendFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const receiver = await User.findById(receiverId);
    const sender = await User.findById(senderId);

    if (!receiver || !sender) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if request already exists
    const existingRequest = receiver.U_friend_requests.find(
      request => request.from.toString() === senderId && request.status === 'pending'
    );

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    // Check if users are already friends
    const alreadyFriends = receiver.U_contacts.some(contact => contact.U_id.toString() === senderId) ||
                          sender.U_contacts.some(contact => contact.U_id.toString() === receiverId);

    if (alreadyFriends) {
      return res.status(400).json({ message: 'Users are already friends' });
    }

    receiver.U_friend_requests.push({
      from: senderId,
      status: 'pending'
    });

    await receiver.save();
    res.status(200).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error('Friend request error:', error);
    res.status(500).json({ message: 'Error sending friend request' });
  }
};

// Accept friend request
const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { userId } = req.body;

    // Find user and request
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const request = user.U_friend_requests.id(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Friend request already processed' });
    }

    // Update request status
    request.status = 'accepted';

    // Get sender user
    const fromUser = await User.findById(request.from);
    if (!fromUser) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    // Create new chatroom
    const chatroom = new Chatroom({
      participants: [userId, request.from],
      type: 'private'
    });
    await chatroom.save();

    // Add users to each other's contacts
    user.U_contacts.push({
      U_id: request.from,
      U_avatar: fromUser.U_avatar,
      U_remember_name: fromUser.U_user_name,
      chatroom_id: chatroom._id
    });

    fromUser.U_contacts.push({
      U_id: userId,
      U_avatar: user.U_avatar,
      U_remember_name: user.U_user_name,
      chatroom_id: chatroom._id
    });

    // Save both users
    await Promise.all([user.save(), fromUser.save()]);

    // Return updated user with new contact
    const updatedUser = await User.findById(userId)
      .populate('U_contacts.U_id', 'U_user_name U_avatar')
      .select('-U_password');

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Accept friend request error:', error);
    res.status(500).json({ message: 'Error accepting friend request' });
  }
};

// Reject friend request
const rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const request = user.U_friend_requests.id(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Friend request already processed' });
    }

    request.status = 'rejected';
    await user.save();

    const updatedUser = await User.findById(userId)
      .select('-U_password');

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Reject friend request error:', error);
    res.status(500).json({ message: 'Error rejecting friend request' });
  }
};

// Get friend requests
const getFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate({
        path: 'U_friend_requests.from',
        select: 'U_user_name U_avatar U_email'
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const pendingRequests = user.U_friend_requests
      .filter(request => request.status === 'pending')
      .map(request => ({
        _id: request._id,
        sender: request.from,
        status: request.status,
        createdAt: request.createdAt
      }));

    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error('Get friend requests error:', error);
    res.status(500).json({ message: 'Error fetching friend requests' });
  }
};

module.exports = {
  getUserByEmailAndPassword,
  registerNewUser,
  getUserByToken,
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests
}
