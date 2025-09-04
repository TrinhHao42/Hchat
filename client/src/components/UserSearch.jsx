import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../configs/axios';

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user.user);

  useEffect(() => {
    const searchUsers = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/user/search?query=${encodeURIComponent(searchQuery)}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchUsers, 500);
    return () => clearTimeout(debounce);
  }, [searchQuery, user._id]);

  const handleSendFriendRequest = async (toUserId) => {
    try {
      await axiosInstance.post('/data/api/user/friend-request/send', {
        fromUserId: user._id,
        toUserId
      });
      // Update UI to show request sent
      setSearchResults(prev => 
        prev.map(u => u._id === toUserId ? { ...u, requestSent: true } : u)
      );
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm người dùng..."
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>

      {searchResults.length > 0 && (
        <div className="mt-4 space-y-2">
          {searchResults.map((result) => (
            <div
              key={result._id}
              className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={result.U_avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + result.U_user_name}
                  alt={result.U_user_name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-white">
                    {result.U_user_name.length > 16
                      ? result.U_user_name.slice(0, 13) + '...'
                      : result.U_user_name}
                  </h4>
                  <p className="text-sm text-gray-400">{result.U_email}</p>
                </div>
              </div>
              <button
                onClick={() => handleSendFriendRequest(result._id)}
                disabled={result.requestSent}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  result.requestSent
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {result.requestSent ? 'Đã gửi lời mời' : 'Kết bạn'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
