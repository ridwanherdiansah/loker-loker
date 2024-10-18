import React, { useRef, useState } from "react";
import Header from "@/component/layout/header";
import Input from "@/component/form/input";
import Button from "@/component/button";
import Image from "@/component/button"
import UserNetwork from "@/network/UserNetwork";
import swal from "sweetalert";
export default function Registrasi(){
    const formRef = useRef();
    const [error, setError] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const validateInputs = () => {
      const validasiErrors = {};
      if (!name.trim()) {
        validasiErrors.name = "Name harus di isi";
      } else if (email.length > 50){
        validasiErrors.name = "Name tidak boleh lebih dari 50 karakter";
      }
      if (!email.trim()) {
        validasiErrors.email = "Email harus di isi";
      } else if (email.length > 50) {
        validasiErrors.email = "Email tidak boleh lebih dari 50 karakter";
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
          const registrasi = {
            name: name,
            email: email,
            password: password,
          };

          try {
            const response = await UserNetwork.registrasi(registrasi);

            if (response.data.code == 200) {
              const message = response.data.message;
              swal(message, {
                icon:"success",
              }).then(() => {
                window.location.href = "./"
              });
            } else {
              const message = response.data.message;
              swal(message, {
                icon:"error",
              });
            }

          } catch (error) {}
        } else {
          setError(validasiErrors);
        }
    }

    return(
        <>
      <Header />
      <div className="flex border px-24 py-8">
        <div className="w-1/3">
          <h1 className="text-7xl">Welcome to your professional community</h1>
          <form ref={formRef} onSubmit={formSubmit}>
            <div className="flex flex-col space-y-4 mt-24">
              <div className="flex flex-col">
                <label className="font-semibold">Name</label>
                <Input
                  type="name"
                  height="h-14"
                  width="w-full"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  error={error.name}
                />
              </div>
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
                name="Registrasi"
                width="w-full"
                height="h-14"
                fontSize="font-bold"
                textColor="text-white"
                bgColor="bg-blue-500"
              />
            </div>
          </form>
          <div className="flex justify-center items-center p-4">
            <a href="./" className="font-bold text-blue-500 hover:text-blue-200 p-2">Login</a>
          </div>
        </div>
        <div className="w-1/2">
          <Image src="logo.png" width="" height="" />
        </div>
      </div>
    </>
    )
}