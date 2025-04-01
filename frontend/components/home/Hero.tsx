"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { SignInButton, useSession } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Hero = () => {
  const { isLoaded, isSignedIn } = useSession();
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isSignedIn) {
    redirect("/dashboard");
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 400,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      }}
      className="flex flex-col items-center justify-center h-full bg-violet-200 w-full px-4 rounded-2xl gap-y-10"
    >
      <div>
        <motion.h1
          className="text-6xl font-bold mb-4 text-center text-blue-600"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Dash Vibe
        </motion.h1>

        <motion.p
          className="text-md text-gray-600 max-w-sm text-center"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.7,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.02 }}
        >
          Enjoy a collaborative experience with friends and complete your todos
        </motion.p>
      </div>
      <motion.div
        whileHover={{
          scale: 1.05,
        }}
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 1,
        }}
      >
        <Button
          onClick={() => {
            window.location.href = "/dashboard";
          }}
          asChild
        >
          <SignInButton>Start your journey</SignInButton>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
