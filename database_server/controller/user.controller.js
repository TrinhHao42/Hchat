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

    const { U_user_name, U_avatar, U_contacts, U_email, U_friend_requests } = user.toObject()

    return res.status(200).json({ U_user_name, U_avatar, U_contacts, U_email, U_friend_requests })
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
    { _id: 0, U_user_name: 1, U_email: 1, U_avatar: 1, U_contacts: 1, U_friend_requests: 1 }
  )
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => res.status(500).json({ message: `lỗi server: ${error.message}` }))
}

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

const sendFriendRequest = async (req, res) => {
  try {
    const { senderEmail, receiverEmail } = req.body;

    if (!senderEmail || !receiverEmail)
      return res.status(400).json({ message: 'senderEmail và receiverEmail là bắt buộc' });

    if (senderEmail.toLowerCase() === receiverEmail.toLowerCase())
      return res.status(400).json({ message: 'Không thể gửi lời mời cho chính mình' });

    const sender = await User.findOne({ U_email: senderEmail });
    const receiver = await User.findOne({ U_email: receiverEmail });

    if (!sender || !receiver)
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });

    const alreadyFriends =
      receiver.U_contacts.some(c => c.U_id?.toString() === sender._id.toString()) ||
      sender.U_contacts.some(c => c.U_id?.toString() === receiver._id.toString());

    if (alreadyFriends)
      return res.status(400).json({ message: 'Hai người đã là bạn bè' });

    const existingRequest = receiver.U_friend_requests.some(
      r => r.from?.toString?.() === sender._id.toString() || 
           (r.from?.U_email && r.from.U_email.toLowerCase() === senderEmail.toLowerCase())
    );
    if (existingRequest)
      return res.status(400).json({ message: 'Đã gửi lời mời kết bạn trước đó' });

    const newRequest = {
      from: {
        U_user_name: sender.U_user_name,
        U_email: sender.U_email,
        U_avatar: sender.U_avatar || ""
      },
      status: 'pending'
    };

    await User.updateOne(
      { _id: receiver._id },
      { $push: { U_friend_requests: newRequest } }
    );

    return res.status(200).json({
      message: 'Gửi lời mời thành công',
      request: newRequest
    });

  } catch (error) {
    console.error('Friend request error:', error);
    return res.status(500).json({
      message: 'Lỗi khi gửi lời mời kết bạn',
      error: error.message
    });
  }
};


const acceptFriendRequestByUsername = async (req, res) => {
  try {
    const { userEmail, senderEmail } = req.body;

    if (!userEmail || !senderEmail) {
      return res.status(400).json({ message: 'userEmail và senderEmail là bắt buộc' });
    }

    // Find current user
    const user = await User.findOne({ U_email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User không tìm thấy' });
    }

    // Find the friend request
    const requestIndex = user.U_friend_requests.findIndex(
      request => request.from.U_email === senderEmail && request.status === 'pending'
    );

    if (requestIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy lời mời kết bạn' });
    }

    // Update request status
    user.U_friend_requests[requestIndex].status = 'accepted';

    // Find sender
    const fromUser = await User.findOne({ U_email: senderEmail });
    if (!fromUser) {
      return res.status(404).json({ message: 'Người gửi không tìm thấy' });
    }

    // Create new chatroom
    const chatroom = new Chatroom({
      participants: [user._id, fromUser._id],
      type: 'private'
    });
    await chatroom.save();

    // Add to contacts
    user.U_contacts.push({
      avatarUrl: fromUser.U_avatar,
      rememberName: fromUser.U_user_name,
      chatroomId: chatroom._id,
      status: fromUser.U_status || 'offline'
    });

    fromUser.U_contacts.push({
      avatarUrl: user.U_avatar,
      rememberName: user.U_user_name,
      chatroomId: chatroom._id,
      status: user.U_status || 'offline'
    });

    // Save both users
    await Promise.all([user.save(), fromUser.save()]);

    // Return updated user
    const updatedUser = await User.findOne({ U_email: userEmail })
      .select('-U_password');

    res.status(200).json({
      message: 'Đã chấp nhận lời mời kết bạn',
      user: updatedUser
    });
  } catch (error) {
    console.error('Accept friend request error:', error);
    res.status(500).json({ message: 'Lỗi khi chấp nhận lời mời kết bạn' });
  }
};

const rejectFriendRequestByUsername = async (req, res) => {
  try {
    const { userEmail, senderEmail } = req.body;

    if (!userEmail || !senderEmail) {
      return res.status(400).json({ message: 'userEmail và senderEmail là bắt buộc' });
    }

    // Find current user
    const user = await User.findOne({ U_email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User không tìm thấy' });
    }

    // Find the friend request
    const requestIndex = user.U_friend_requests.findIndex(
      request => request.from.U_email === senderEmail && request.status === 'pending'
    );

    if (requestIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy lời mời kết bạn' });
    }

    // Update request status
    user.U_friend_requests[requestIndex].status = 'rejected';

    await user.save();

    // Return updated user
    const updatedUser = await User.findOne({ U_email: userEmail })
      .select('-U_password');

    res.status(200).json({
      message: 'Đã từ chối lời mời kết bạn',
      user: updatedUser
    });
  } catch (error) {
    console.error('Reject friend request error:', error);
    res.status(500).json({ message: 'Lỗi khi từ chối lời mời kết bạn' });
  }
};

const acceptFriendRequest = async (req, res) => {
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

    request.status = 'accepted';

    const fromUser = await User.findById(request.from);
    if (!fromUser) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    const chatroom = new Chatroom({
      participants: [userId, request.from],
      type: 'private'
    });
    await chatroom.save();

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

    await Promise.all([user.save(), fromUser.save()]);

    const updatedUser = await User.findById(userId)
      .populate('U_contacts.U_id', 'U_user_name U_avatar')
      .select('-U_password');

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Accept friend request error:', error);
    res.status(500).json({ message: 'Error accepting friend request' });
  }
};

const rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { fromEmail, toEmail } = req.body;

    const sender = await User.findOne({ U_email: fromEmail });
    const receiver = await User.findOne({ U_email: toEmail });

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    const request = receiver.U_friend_requests.find(
      (req) => req.from.toString() === sender._id.toString() && req.status === 'pending'
    );

    if (!request) {
      return res.status(404).json({ message: 'Không tìm thấy lời mời kết bạn' });
    }

    request.status = 'rejected';
    await receiver.save();

    const updatedReceiver = await User.findById(receiver._id)
      .select('-U_password')
      .populate('U_friend_requests.from', 'U_user_name U_email U_avatar');

    return res.status(200).json({
      message: 'Từ chối lời mời kết bạn thành công',
      user: updatedReceiver
    });

  } catch (error) {
    console.error('❌ Reject friend request error:', error);
    return res.status(500).json({ message: 'Lỗi khi từ chối lời mời kết bạn' });
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
  acceptFriendRequestByUsername,
  rejectFriendRequestByUsername,
  getFriendRequests
}
