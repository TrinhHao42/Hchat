import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/model/User';
import axiosInstance from '@/configs/axiosInstance';

interface UserStore {
  user: User | null;
  setUser: (user: Partial<User> | null) => void;
  updateUserAsync: (updates: Partial<User>) => Promise<void>;
  logoutAsync: () => Promise<void>;
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => {
        if (!user) {
          set({ user: null });
          return;
        }

        set({
          user: {
            U_user_name: user.U_user_name || "",
            U_email: user.U_email || "",
            U_avatar: user.U_avatar || "",
            U_contacts: user.U_contacts || [],
            U_friend_requests: user.U_friend_requests || [],
            U_status: user.U_status || "online",
          } as User,
        });
      },

      updateUserAsync: async (updates) => {
        try {
          const res = await axiosInstance.put('/user', updates);
          const updatedUser = res.data;
          get().setUser(updatedUser);
        } catch (error) {
          console.error('Failed to update user:', error);
        }
      },

      logoutAsync: async () => {
        try {
          await axiosInstance('/auth/logout');
        } catch (error) {
          console.error('Failed to logout:', error);
        } finally {
          set({ user: null });
        }
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

export { useUserStore };
