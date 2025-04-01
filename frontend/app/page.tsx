import Hero from "@/components/home/Hero";
import React from "react";

const page = () => {
  return (
    <div className="h-screen bg-primary/20 flex items-center justify-center">
      <div className="h-3/4 w-3/4">
        <Hero />
      </div>
      <div className=""></div>
    </div>
  );
};

export default page;
