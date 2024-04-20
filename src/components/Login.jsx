import React, { useRef, useState } from "react";
import bg from "/bg.jpg";
import Header from "./template/Header";
import { validate, checkSignUpData } from "./utils/validate";
import { auth } from "./utils/firebase";
import { useDispatch ,useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { addUser } from "../store/reducers/userSlice";
import Footer from "./template/Footer";
import lang from "./utils/languageConstant";
// import { getAuth } from "firebase/auth";

const Login = () => {
  const [IsSignin, setIsSignin] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);

  const dispatch = useDispatch();

  const language = useSelector(state=>state.language.value);

  const toggleSignInForm = () => {
    setIsSignin(!IsSignin);
  };

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const url = useRef(null);

  const handleButtonClick = () => {
    // -------------SIGN IN CODE----------------
    if (IsSignin) {
      const data = validate(email.current.value, password.current.value);
      // console.log(data);
      seterrorMessage(data);

      //   ----------------SIGN IN LOGIC --------------
      if (data) return;

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const { user } = userCredential;
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("invalid-credential")) {
            seterrorMessage("Invalid Credentials / User not Found ");
          } else seterrorMessage(errorCode + " - " + errorMessage);
        });
    }
    // -------------SIGN UP CODE----------------
    else {
      const data = checkSignUpData(
        name.current.value,
        email.current.value,
        password.current.value
      );
      // console.log(data);
      seterrorMessage(data);

      if (data) return;

      // ------------------------SIGNUP LOGIC--------------------------------
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const { user } = userCredential;
          // console.log(user);

          // NOW IF THE USER HAS COME TO THIS STEPS MEAN NOW THE USER IS GOING TO SIGNED IN SO I WILL UPDATE THE USER PROFILE BY THAT I MEAN I WILL SEND THE DATA OF NAME AND PHOTO URL
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: url.current.value,
          })
            .then(() => {
              // Profile updated!

              // Dispatching The action from here so that image and can be updated easily
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // console.log(user);
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // console.log("dispatched");

              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
              seterrorMessage(error.message);
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("email-already-in-use")) {
            seterrorMessage("Email is already registered");
          }
          // seterrorMessage(errorCode + " " + errorMessage)
        });
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
      className="w-screen h-screen overflow-y-auto"
    >
      <Header />
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" bg-[#000000b1] w-96 py-10 container mx-auto my-4 flex flex-col gap-10 items-center justify-center text-white rounded-lg"
      >
        <h1 className="text-3xl font-bold">
          {IsSignin ? lang[language].siginIn : lang[language].signUp}
        </h1>
        {!IsSignin && (
          <input
            ref={name}
            className="px-3 text-xl py-3 w-[70%] border border-zinc-600  bg-[#000000b1]  rounded-md"
            type="name"
            placeholder="Name"
          />
        )}
        {!IsSignin && (
          <input
            ref={url}
            className="px-3 text-xl py-3 w-[70%] border border-zinc-600  bg-[#000000b1]  rounded-md"
            type="url"
            placeholder="Image Url"
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
            {IsSignin ? lang[language].siginIn : lang[language].signUp}
          </button>
          {IsSignin ? (
            <p className="text-zinc-400 mt-4 mb-10">
              {lang[language].newToNetflix}{" "}
              <span
                onClick={() => toggleSignInForm()}
                className="font-bold cursor-pointer text-white hover:border-b-2 "
              >
                {lang[language].signUpNow}
              </span>
            </p>
          ) : (
            <p className="text-zinc-400 mt-4 mb-10">
              {lang[language].alreadyRegistered}{" "}
              <span
                onClick={() => toggleSignInForm()}
                className="font-bold cursor-pointer text-white hover:border-b-2"
              >
                {lang[language].siginIn}
              </span>
            </p>
          )}
          <p className="text-sm text-zinc-400">{lang[language].Learn_more} <span className="text-blue-500 hover:border-b-2 hover:border-blue-500 cursor-pointer">Learn more.</span></p>
        </div>
      </form>
      <Footer/>
    </div>
  );
};

export default Login;
