import React, { useRef, useState } from "react";
import bg from "/bg.jpg";
import Header from "./Header";
import { validate, checkSignUpData } from "./utils/validate";
import { auth } from "./utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
// import { getAuth } from "firebase/auth";

const Login = () => {
  const [IsSignin, setIsSignin] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const navigate = useNavigate()

  const toggleSignInForm = () => {
    setIsSignin(!IsSignin);
  };

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {

    // -------------SIGN IN CODE----------------
    if (IsSignin) {
      const data = validate(email.current.value, password.current.value);
      console.log(data);
      seterrorMessage(data);



    //   ----------------SIGN IN LOGIC --------------
    if(data)return;

    signInWithEmailAndPassword(auth,email.current.value,password.current.value)
    .then((userCredential)=>{
        const {user} = userCredential;
        console.log(user);
        navigate('/browse')
    })
    .catch(error=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode.includes("invalid-credential")){seterrorMessage("Invalid Credentials / User not Found ")}
        // seterrorMessage(errorCode+" - "+ errorMessage)
        
    })




    } 
    // -------------SIGN UP CODE----------------
    else {
      const data = checkSignUpData(
        name.current.value,
        email.current.value,
        password.current.value
      );
      console.log(data);
      seterrorMessage(data);

      if (data) return;

      // ------------------------SIGNUP LOGIC--------------------------------
      createUserWithEmailAndPassword(auth ,email.current.value,password.current.value)
      .then((userCredential)=>{
        const {user} = userCredential
        console.log(user)
        navigate('/browse')
      })
      .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode.includes("email-already-in-use")){seterrorMessage("Email is already registered")}
        // seterrorMessage(errorCode + " " + errorMessage)
        
      })
    }
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
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" bg-[#000000b1] w-96 py-10 container mx-auto my-4 flex flex-col gap-10 items-center justify-center text-white rounded-lg"
      >
        <h1 className="text-3xl font-bold">
          {IsSignin ? "Sign In" : "Sign Up"}
        </h1>
        {!IsSignin && (
          <input
            ref={name}
            className="px-3 text-xl py-3 w-[70%] border border-zinc-600  bg-[#000000b1]  rounded-md"
            type="name"
            placeholder="Name"
          />
        )}
        <input
          ref={email}
          className="px-3 text-xl py-3 w-[70%] border border-zinc-600  bg-[#000000b1]  rounded-md"
          type="text"
          placeholder="Email Address"
        />
        <input
          ref={password}
          className="px-3 text-xl py-3 w-[70%] border border-zinc-600  bg-[#000000b1]  rounded-md"
          type="password"
          placeholder="Password"
        />
        <div className=" w-[70%]">
          {errorMessage && (
            <p className=" mb-4 text-red-500 font-semibold">{errorMessage}</p>
          )}
          <button
            onClick={() => handleButtonClick()}
            className="px-4 py-2 text-lg bg-[#E50914] rounded font-medium w-full"
          >
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
      </form>
    </div>
  );
};

export default Login;
