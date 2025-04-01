import Navbar from "@/components/common/Navbar";
import React from "react";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen bg-slate-300">
      <Navbar />
      {children}
    </div>
  );
};

export default BaseLayout;
