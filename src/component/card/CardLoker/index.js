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
  deskripsi,
  jmlPelamar,
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
      <div>
        <div className="border rounded-lg p-4">
          <div className="flex flex-col space-y-2">
            <div>
              <Image height="100px" width="100px" src={`${src}`} />
            </div>
            <h1 className="font-bold text-2xl">{keahlian}</h1>
            <div className="flex space-x-2">
              <h2 className="text-xl">{perusahaan}</h2>
              <h3 className="text-xl">{kota}</h3>
            </div>
            <h4 className="text-base text-green-700 font-bold">{tanggal}</h4>
            <h5 className="text-base text-slate-500">{jmlPelamar}</h5>
            <div className="flex space-x-4">
              <Button
                onClick={checkSessionAuth}
                name="Apply"
                width="w-32"
                height="h-10"
                bgColor="bg-blue-500"
                fontSize="font-bold"
                textColor="text-white"
              />
            </div>
          </div>
        </div>
        <div dangerouslySetInnerHTML={deskripsi ? { __html: deskripsi } : { __html: '' }}></div>
      </div>
    </>
  );
}
