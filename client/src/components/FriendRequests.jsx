import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../configs/axios';

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchFriendRequests();
  }, [user._id]);

  const fetchFriendRequests = async () => {
    try {
      const response = await axiosInstance.get('/data/api/user/friend-requests', {
        params: { userId: user._id }
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId, fromUserId) => {
    try {
      await axiosInstance.post('/data/api/user/friend-request/accept', {
        requestId,
        userId: user._id,
        fromUserId
      });
      // Remove the accepted request from the list
      setRequests(prev => prev.filter(req => req._id !== requestId));
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axiosInstance.post('/data/api/user/friend-request/reject', {
        requestId,
        userId: user._id
      });
      // Remove the rejected request from the list
      setRequests(prev => prev.filter(req => req._id !== requestId));
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center p-4 text-gray-400">
        Không có lời mời kết bạn nào
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {requests.map((request) => (
        <div
          key={request._id}
          className="bg-gray-800/50 rounded-xl p-4 space-y-4"
        >
          <div className="flex items-center space-x-3">
            <img
              src={request.from.U_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${request.from.U_user_name}`}
              alt={request.from.U_user_name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4 className="font-medium text-white">{request.from.U_user_name}</h4>
              <p className="text-sm text-gray-400">Muốn kết bạn với bạn</p>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handleRejectRequest(request._id)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
            >
              Từ chối
            </button>
            <button
              onClick={() => handleAcceptRequest(request._id, request.from._id)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors"
            >
              Chấp nhận
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequests;
