import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../input-field";

import { ButtonWrapper } from "../button-wrapper";

import axios from "axios";
import { Endpoints } from "@/services/api/enum";
import { SelectWrapper } from "../select-wrapper";

type FormData = {
  username: string;
  roles: any;
  email: string;
  password: string;
};

export const AddNewUser = () => {
  const [roles, setRoles] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      roles: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    (async () => {
      try {
        await axios.get(Endpoints.GetAccessToken);
        const response = await axios.get(Endpoints.GetRoles);

        if (response.status === 200) {
          const formattedRoles = response.data.map((role: any) => ({
            label: role.name,
            value: role.id,
          }));
          setRoles(formattedRoles);
          if (formattedRoles.length > 0) {
            setValue("roles", formattedRoles[1].value);
          }
        }
      } catch (error) {
        console.error("An error occurred while fetching roles");
      }
    })();
  }, []);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <p className="text-sm text-gray-500 mb-2">Personal Information</p>
        <hr />
        <div className="flex flex-row items-center justify-center gap-4 my-4">
          <div className="w-[50%]">
            <InputField
              type="text"
              labelText="Username"
              name="username"
              placeholder="Enter your username"
              errors={errors}
              register={register}
              required
            />
          </div>
          <div className="flex-grow">
            <SelectWrapper
              label="Role"
              name="roles"
              placeholder="Select..."
              options={roles}
              control={control}
              errors={errors}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-4 my-4">
          <div className="my-4 w-[50%]">
            <InputField
              type="text"
              labelText="Email"
              name="email"
              placeholder="Enter your Email"
              errors={errors}
              register={register}
              required
            />
          </div>
          <div className="flex-grow">
            <InputField
              type="password"
              labelText="Password"
              name="password"
              placeholder="Enter your Password"
              errors={errors}
              register={register}
              required
            />
          </div>
        </div>
      </div>
      <ButtonWrapper text="Save" />
    </form>
  );
};
