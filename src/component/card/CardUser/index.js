import React, { useEffect, useState } from "react";
import Image from "@/component/image";
import Button from "@/component/button";
export default function Index({ user }) {

  const onClick = () => {
    sessionStorage.removeItem(userAuth);
    
    swal({
      title: "Logout Successful",
      text: "you have been logged out successfully",
      icon: "success",
    }).then(() => {
      window.location.href = "/";
    })
  }
  
  return (
    <div className="bg-white rounded-lg p-2 flex flex-col space-y-2 px-4">
      <div className="flex justify-center border-b py-8 ">
        <Image
          height="80px"
          width="80px"
          src={user.cover}
        />
      </div>
      <div className="flex flex-col items-center border-b py-4">
        <h1 className="font-semibold text-slate-800 text-lg">{user.name}</h1>
        <h2 className="text-slate-500 text-sm">{user.bio}</h2>
      </div>
      {/* <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <Button
            onClick={onClick}
            name="Logout"
            height="h-8"
            width="w-24"
            bgColor="bg-blue-500"
            textColor="text-white"
            fontSize="font-semibold"
          />
        </div>
      </div> */}
    </div>
  );
}
