import React, { useState, useEffect } from "react";
import Image from "@/component/image";
import Button from "@/component/button";
import swal from "sweetalert";
export default function index({
  keahlian,
  perusahaan,
  kota,
  tanggal,
  id,
  src,
}) {

  const [userAuth, setUserAuth] = useState([]);

  const checkSessionAuth = () => {
    if (userAuth) {
      window.location.href = `profile/pekerjaan/${id}`
    }else{
      const message = "Anda harus login terlebih dahulu";
      swal(message, {
        icon:"error",
      });
    }
  };

  useEffect(() => {
    const userSession = JSON.parse(sessionStorage.getItem('userAuth'));
    setUserAuth(userSession);
  }, []);
  

  return (
    <>
      <div className="flex flex-row border-b-2 space-x-4 py-4">
        <div>
          <Image height="60px" width="60px" src={`${src}`} />
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-xl">{keahlian}</h1>
          <h2 className="text-xl">{perusahaan}</h2>
          <h3 className="text-base text-slate-500">{kota}</h3>
          <h4 className="text-base text-green-700 font-bold">{tanggal}</h4>
          <Button
            onClick={checkSessionAuth} 
            name="Lihat"
            width="w-32"
            height="h-10"
            bgColor="bg-blue-500"
            fontSize="font-bold"
            textColor="text-white"
          />
        </div>
      </div>
    </>
  );
}
