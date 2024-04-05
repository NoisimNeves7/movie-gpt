import React, { useState } from "react";
import bg from "/bg.jpg";
import Header from "./Header";

const Login = () => {
  const [IsSignin, setIsSignin] = useState(true);
  const toggleSignInForm = () => {
    setIsSignin(!IsSignin);
  };

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.5),rgba(0,0,0,.6)), url(${bg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-screen h-screen px-24 py-4"
    >
      <Header />
      <div className=" bg-[#000000b1] w-96 py-10 container mx-auto my-16 flex flex-col gap-10 items-center justify-center text-white rounded-lg">
        <h1 className="text-3xl font-bold">
          {IsSignin ? "Sign In" : "Sign Up"}
        </h1>
        {!IsSignin && (
          <input
            className="px-3 text-xl py-3 w-[70%] border border-zinc-600  bg-[#000000b1]  rounded-md"
            type="text"
            placeholder="Name"
          />
        )}
        <input
          className="px-3 text-xl py-3 w-[70%] border border-zinc-600  bg-[#000000b1]  rounded-md"
          type="text"
          placeholder="Email Address"
        />
        <input
          className="px-3 text-xl py-3 w-[70%] border border-zinc-600  bg-[#000000b1]  rounded-md"
          type=" text"
          placeholder="Password"
        />
        <div className=" w-[70%]">
          <button className="px-4 py-2 text-lg bg-[#E50914] rounded font-medium w-full">
            {" "}
            {IsSignin ? "Sign In" : "Sign Up"}
          </button>
          {IsSignin ? (
            <p className="text-zinc-400 mt-4 mb-10">
              New To Netflix?{" "}
              <span
                onClick={() => toggleSignInForm()}
                className="font-bold cursor-pointer text-white hover:border-b-2 "
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p className="text-zinc-400 mt-4 mb-10">
              Already Registered?{" "}
              <span
                onClick={() => toggleSignInForm()}
                className="font-bold cursor-pointer text-white hover:border-b-2"
              >
                Sign In
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
