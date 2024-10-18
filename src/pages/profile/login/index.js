import React, { useRef, useState } from "react";
import Input from "@/component/form/input";
import Button from "@/component/button";
import UserNetwork from "@/network/UserNetwork";
export default function Login() {
  const formRef = useRef();
  const [error, setError] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    const validasiErrors = {};
    if (!email.trim()) {
      validasiErrors.email = "Email harus di isi";
    } else if (email.length > 100) {
      validasiErrors.email = "Email tidak boleh lebih dari 100 karakter";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validasiErrors.email = "Email tidak valid";
    }
    if (!password.trim()) {
      validasiErrors.password = "password harus di isi";
    }
    return validasiErrors;
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    const validasiErrors = validateInputs();
    if (Object.keys(validasiErrors).length === 0) {
      const Login = {
        email: email,
        password: password,
      };

      try {
        const response = await UserNetwork.Login(Login);
      } catch (error) {
        console.error("error login", error);
      }
    } else {
      setError(validasiErrors);
    }
  };
  return (
    <div className="flex justify-center items-center bg-slate-200 min-h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form ref={formRef} onSubmit={formSubmit}>
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <Input
              type="email"
              height="h-10"
              width="w-full"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={error.email}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <Input
              type="password"
              height="h-10"
              width="w-full"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              error={error.password}
            />
          </div>
          <Button
            name="Login"
            height="h-10"
            width="w-20"
            bgColor="bg-blue-500"
            textColor="text-white"
            fontSize="font-bold"
          />
        </form>
      </div>
    </div>
  );
}
