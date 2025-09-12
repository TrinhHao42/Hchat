import { User } from "@/types/model/User";
import Image from "next/image";

const UserSheet = ({ user }: { user: User | null }) => {
  if (!user) return null;
  const isOnline = user.U_status === 'online';

  return (
    <div className="py-2 flex items-center gap-3 relative">
      <div className="relative w-10 h-10">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {user.U_avatar ? (
            <Image
              src={user.U_avatar}
              alt="user avatar"
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white font-bold">
              {user.U_user_name?.[0]?.toUpperCase()}
            </div>
          )}
        </div>

        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            isOnline ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
      </div>

      <div>
        <h2 className="font-semibold text-gray-800">{user.U_user_name}</h2>
        <p className="text-sm text-gray-500">{user.U_status}</p>
      </div>
    </div>
  );
};

export default UserSheet
