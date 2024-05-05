"use client";

import React, { FormEvent } from "react";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Form() {
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    console.log(res);
    if (!res?.error) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    if (
      res.error == "Cannot read properties of undefined (reading 'password')"
    ) {
      alert(
        `Error: ${res?.error}\nEmail not found. Please make sure your email are correct or register.`
      );
      return;
    } else if (res.error == "CredentialsSignin") {
      alert(
        `Error: ${res?.error}\nIncorrect password. Please make sure your password are correct.`
      );
      return;
    }

    alert(`Unknown Error: ${res?.error}`);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center h-screen mx-auto max-w-md"
      >
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold text-white">Login Form</h1>
          <Input name="email" placeholder="Email" type="email" />
          <Input name="password" placeholder="Password" type="password" />
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
