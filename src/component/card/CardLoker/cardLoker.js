import React, { useEffect, useState } from "react";
import Image from "@/component/image";
import Button from "@/component/button";
import Link from "next/link";
import swal from "sweetalert";
import PelamarNetwork from "@/network/PelamarNetwork";
export default function CardLoker({ nameLoker, cover, namePerusahaan, deskripsi, id } ) {

  const [userAuth, setUserAuth] = useState([]);

  const onsubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        id_loker: id,
        id_user: userAuth
      }

      const response = await PelamarNetwork.create(data);
      if (response.data.code == 200) {
        const message = response.data.message;
          swal(message, {
              icon: "success",
          }).then(() => {
              location.reload();
          });
      } else {
          const message = response.data.message;
          swal(message, {
              icon: "error",
          });
      }  
    } catch (error) {
      console.error('erro apply', error);
    }

  }

  useEffect(() => {
    const userSession = JSON.parse(sessionStorage.getItem('userAuth'));
    setUserAuth(userSession);
  }, []);

  return (
    <Link href={`pekerjaan/${id}`}>
      <div className="bg-white rounded-lg p-2 flex flex-col space-y-2 px-4 mb-4">
        <div className="flex items-center">
          <Image
            height="50px"
            width="50px"
            src={cover}
          />
          <div className="flex flex-col mx-4">
            <h1 className="font-semibold text-sm text-black">{nameLoker}</h1>
            <h2 className="text-xs text-slate-500">{namePerusahaan}</h2>
          </div>
        </div>
        <div className="line-clamp-2" dangerouslySetInnerHTML={deskripsi ? { __html: deskripsi } : { __html: '' }}></div>
        <div className="flex space-x-3 border-t pt-4">
          <Button
            onClick={onsubmit}
            name="Apply"
            height="h-10"
            width="w-24"
            bgColor="bg-blue-500"
            textColor="text-white"
            fontSize="font-bold"
          />
          <Button
            href={`/loker/${id}`}
            name="Lihat"
            height="h-10"
            width="w-24"
            bgColor="bg-slate-400"
            textColor="text-white"
            fontSize="font-bold"
          />
        </div>
      </div>
      </Link>
  );
}
