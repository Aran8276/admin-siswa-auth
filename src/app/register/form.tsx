"use client";

import React, { FormEvent } from "react";
import { Button, Input } from "@nextui-org/react";

function Form() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center h-screen mx-auto max-w-md"
      >
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold text-white">Registration Form</h1>
          <Input name="email" placeholder="Email" type="email" />
          <Input name="password" placeholder="Password" type="password" />
          <Button type="submit">Register User</Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
