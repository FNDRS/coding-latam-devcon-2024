"use client";
import { InputField } from "@/components/input-field";
import { useAuth } from "@/context/auth-context";
import { Endpoints } from "@/services/api/enum";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Login(): JSX.Element {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    email: string;
    password: string;
  };

  const onSubmit = async (data: FormData) => {
    try {
      const loadingToast = toast.loading("Logging in...");

      const response = await axios.post(Endpoints.Login, data);

      if (response.data.status !== 200) {
        toast.dismiss(loadingToast);
        toast.error("Invalid email or password");
        return;
      }
      const userInfo = response?.data?.body?.user;

      login(userInfo);

      toast.dismiss(loadingToast);
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
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
        <h1 className="font-black text-md">PAYBRIDGE</h1>

        <div className="flex flex-col items-center justify-between w-full">
          <h1 className="font-extrabold text-4xl my-4">Welcome Back</h1>
          <p className="text-gray-500 text-center">
            Enter your email and password to access your account
          </p>
        </div>
        <form
          className="flex flex-col justify-between w-full px-4 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <InputField
              type="text"
              labelText="Email Address"
              name="email"
              placeholder="Enter your Email"
              errors={errors}
              register={register}
              required
            />
          </div>
          <div className="flex flex-col">
            <InputField
              type="password"
              labelText="Password"
              name="password"
              placeholder="Enter your password"
              errors={errors}
              register={register}
              required
              watch={watch}
            />
          </div>
          {/*   <span className="text-sm text-gray-700 text-right font-bold hover:underline cursor-pointer">
            Forgot Password?
          </span> */}
          <button className="bg-black text-white py-4 rounded-xl font-extrabold mt-8">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
