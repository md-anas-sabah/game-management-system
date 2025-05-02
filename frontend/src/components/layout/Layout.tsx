import React from "react";
import Navbar from "./Navbar";
import { Toaster } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col w-[80%] mr-auto ml-auto">
      <Navbar />
      <main className="flex-1 container py-6">{children}</main>
      <footer className="border-t">
        <div className="container flex h-14 items-center justify-center text-sm">
          <p>© 2025 Game Management System. All rights reserved.</p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
