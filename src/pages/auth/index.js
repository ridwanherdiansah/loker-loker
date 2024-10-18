import React, { useRef, useState, useEffect } from "react";
import Header from "@/component/layout/header";
import Button from "@/component/button";
import Image from "@/component/image";
import Input from "@/component/form/input";
import UserNetwork from "@/network/UserNetwork";
import swal from "sweetalert";
import Link from "next/link";

export default function index() {
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
      const login = {
        email: email,
        password: password,
      };

      try {
        const response = await UserNetwork.login(login);
          
        // Simpan response ke dalam session
        if (response.code == 200) {
          const message = response.message;
          swal(message, {
            icon:"success",
          }).then(() => {
            sessionStorage.setItem('userAuth', JSON.stringify(response.user.email));
            window.location.href = "profile/halamanUtama/"
          });
        }else{
          const message = response.message;
          swal(message, {
            icon:"error",
          });
        }

      } catch (error) {}
    } else {
      setError(validasiErrors);
    }
  };

  return (
    <>
      <Header />
      <div className="flex border px-24 py-8">
        <div className="w-1/3">
          <h1 className="text-7xl">Welcome to your professional community</h1>
          <form ref={formRef} onSubmit={formSubmit}>
            <div className="flex flex-col space-y-4 mt-24">
              <div className="flex flex-col">
                <label className="font-semibold">Email</label>
                <Input
                  type="email"
                  height="h-14"
                  width="w-full"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  error={error.email}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Password</label>
                <Input
                  type="password"
                  height="h-14"
                  width="w-full"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  error={error.password}
                />
              </div>
              <Button
                name="Login"
                width="w-full"
                height="h-14"
                fontSize="font-bold"
                textColor="text-white"
                bgColor="bg-blue-500"
              />
            </div>
          </form>
          <div className="flex justify-center items-center p-4">
            <a href="./auth/registrasi" className="font-bold text-blue-500 hover:text-blue-200 p-2">Registrasi</a>
          </div>
        </div>
        <div className="w-1/2">
          <Image src="logo.png" width="" height="" />
        </div>
      </div>
    </>
  );
}
