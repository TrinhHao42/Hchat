import GuestRouter from "@/middleware/GuestRouter";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <GuestRouter>
            <div className="flex min-h-screen">
                <div className="m-auto">{children}</div>
            </div>
        </GuestRouter>
    );
}

export default AuthLayout;
