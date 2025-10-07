import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/model/User';
import axiosInstance from '@/configs/axiosInstance';

interface UserStore {
  user: User | null;
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  setUser: (user: Partial<User> | null) => void;
  updateUserAsync: (updates: Partial<User>) => Promise<void>;
  logoutAsync: () => Promise<void>;
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isHydrated: false,

      setHydrated: (hydrated) => set({ isHydrated: hydrated }),

      setUser: (user) => {
        if (!user) {
          set({ user: null });
          return;
        }

        set({
          user: {
            U_user_name: user.U_user_name ?? "",
            U_email: user.U_email ?? "",
            U_avatar: user.U_avatar ?? "",
            U_contacts: Array.isArray(user.U_contacts) ? user.U_contacts : [],
            U_friend_requests: Array.isArray(user.U_friend_requests) ? user.U_friend_requests : [],
            U_status: user.U_status ?? "online",
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
          const { disconnectSocket } = await import('./connectSocket');
          disconnectSocket();

          await axiosInstance.post('/auth/logout');
          console.log("Logout API called successfully");

        } catch (error) {
          console.error('Logout API failed:', error);
        } finally {
          set({ user: null });
          console.log("User state cleared");
        }
      },
    }),
    {
      name: 'user-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated?.(true);
      },
    }
  )
);

export { useUserStore };
