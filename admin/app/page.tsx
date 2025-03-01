"use client";
import React, { FC, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import Verification from "./components/Auth/Verification";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import socketIO from "socket.io-client";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

interface Props {}

const Page: FC<Props> = (props) => {
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      redirect("/admin");
    }
  }, [user]);
  useEffect(() => {
    socketId.on("connection", () => {
      console.log("Socket connected");
    });

    // Cleanup on unmount
    return () => {
      socketId.disconnect();
    };
  }, []);
  
  return (
    <div>
      <Heading
        title="ELearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <div className="w-[90%] md:w-[420px] m-auto h-screen flex items-center justify-center">
        {route === "Login" && <Login setRoute={setRoute} />}
        {route === "Sign-up" && <Signup setRoute={setRoute} />}
        {route === "Verification" && <Verification setRoute={setRoute} />}
      </div>
    </div>
  );
};

const Custom: FC<{children: React.ReactNode}>=({children})=>{
  const {isLoading} = useLoadUserQuery({});
useEffect(()=>{
  socketId.on("connection",()=>{});
},[])

  return(
    <>
    {
      isLoading? <Loader/>:<>{children}</>
    }
    </>
  )
}

export default Page;
