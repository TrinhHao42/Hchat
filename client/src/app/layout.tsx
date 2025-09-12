import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RazoDo - Ứng dụng chat miễn phí, bảo mật",
  description: "Trải nghiệm chat an toàn và nhanh chóng với RazoDo",
  icons: {
    icon: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
