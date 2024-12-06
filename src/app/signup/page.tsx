"use client";
import { Endpoints } from "@/services/api/enum";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

export default function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    name: string;
    email: string;
    password: string;
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(Endpoints.SignUp, data);

      if (response.status === 200) {
        console.log("Signed up successfully");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

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
      <div className="flex flex-col items-center justify-evenly h-auto w-[444px] mx-auto my-8 gap-8 min-w-1/2">
        <Image
          src="/img/logo.webp"
          alt="logo"
          width={50}
          height={100}
          priority
        />
        <div className="flex flex-col items-center justify-between w-full">
          <h1 className="font-extrabold text-2xl">Sign up</h1>
          <p className="text-gray-500 text-center">
            Welcome! Please fill in the details to create your account.
          </p>
        </div>

        <form
          className="flex flex-col justify-between w-full px-4 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-extrabold">
              Name
            </label>
            <input
              type="name"
              id="name"
              placeholder="Enter your Name"
              className="bg-gray-100 text-gray-800 py-4 outline-black rounded-lg placeholder:text-text-gray-500  pl-4"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-extrabold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="bg-gray-100 text-gray-800 py-4 outline-black rounded-lg placeholder:text-text-gray-500  pl-4"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-extrabold">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              className="bg-gray-100 text-gray-800 py-4 outline-black rounded-lg placeholder:text-text-gray-500  pl-4"
            />
          </div>
          <button className="bg-black text-white py-4 rounded-xl font-extrabold mt-8">
            Sign Up
          </button>
          <p className="text-gray-500 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-black text-sm font-extrabold hover:underline cursor-pointer"
            >
              Sign In
            </a>
          </p>{" "}
        </form>
      </div>
    </div>
  );
}
