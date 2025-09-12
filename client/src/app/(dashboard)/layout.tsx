import UserWebMenu from "@/components/UserMenuWeb";
import UserAndroidMenu from "@/components/UserMenuAndroid";
import ProtectRouter from "@/middleware/ProtectedRouter";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectRouter>
      <div className="flex min-h-screen flex-col md:flex-row">
        <div className="hidden md:block md:w-64 bg-white shadow">
          <UserWebMenu />
        </div>

        <main className="flex-grow bg-gray-100">
          {children}
        </main>

        <div className="block md:hidden fixed bottom-0 left-0 right-0 bg-white shadow">
          <UserAndroidMenu />
        </div>
      </div>
     </ProtectRouter>
  );
};

export default DashBoardLayout;
