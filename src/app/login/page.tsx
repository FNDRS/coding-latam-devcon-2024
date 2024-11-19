import Image from "next/image";
import React from "react";

export default function Login(): JSX.Element {
  return (
    <div className="flex flex-row flex-wrap md:flex-nowrap items-center lg:w-[1020px]  p-2 rounded-3xl md:h-[640px] w-full justify-center shadow-2xl">
      <div className="flex items-center justify-center min-w-1/2 md:h-full ">
        <Image
          src="/img/login.jpeg"
          alt="logo"
          width={400}
          height={800}
          className="rounded-2xl h-full"
        />
      </div>

      <div className="flex flex-col items-center justify-evenly w-[444px] mx-auto my-8 gap-8 min-w-1/2">
        <Image src="/img/logo.webp" alt="logo" width={50} height={100} />
        <div className="flex flex-col items-center justify-between w-full">
          <h1 className="font-extrabold text-2xl">Welcome Back</h1>
          <p className="text-gray-500 text-center">
            Enter your email and password to access your account
          </p>
        </div>
        <form className="flex flex-col justify-between w-full px-4 gap-2">
          <label htmlFor="email" className="text-sm font-extrabold">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="bg-gray-100 text-gray-800 py-4 outline-black rounded-lg placeholder:text-text-gray-500  pl-4"
          />
          <label htmlFor="password" className="text-sm font-extrabold">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="bg-gray-100 text-gray-800 py-4 outline-black rounded-lg placeholder:text-text-gray-500  pl-4"
          />
          <span className="text-sm text-gray-700 text-right font-bold hover:underline cursor-pointer">
            Forgot Password?
          </span>
          <button className="bg-black text-white py-4 rounded-xl font-extrabold mt-8">
            Sign In
          </button>
          <p className="text-gray-500 text-center">
            Don't have an account?{" "}
            <a className="text-black text-sm font-extrabold hover:underline cursor-pointer">
              Sign Up
            </a>
          </p>{" "}
        </form>
      </div>
    </div>
  );
}
