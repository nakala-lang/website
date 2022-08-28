import React from "react";
import MenuBar from "./menubar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen overflow-hidden flex justify-center pb-16">
      <div className="w-full max-w-screen-lg mx-4 lg:mx-32">
        <MenuBar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
