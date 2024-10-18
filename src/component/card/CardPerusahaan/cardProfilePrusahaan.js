import React from "react";
import Image from "@/component/image";
import Button from "@/component/button";
export default function cardProfilePrusahaan({ idUser, perusahaan }) {
  return (
    <div className="bg-white rounded-lg p-2 flex flex-col space-y-2 px-4">
      {perusahaan.code !== 200 ? (
        <>
          <div className="flex flex-col items-center border-b py-4">
          <h1 className="font-semibold text-slate-800 text-lg">Anda belum punya perusahaan</h1>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center items-center p-4">
              <Button 
                name="Registrasi Perusahaan"
                height="h-10"
                width="w-ful"
                bgColor="bg-slate-400"
                textColor="text-white"
                fontSize="font-semibold"
                href={`/perusahaan/${idUser}`}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center border-b py-8 ">
          { perusahaan.code == 200 ? (
              <>
                  {
                      perusahaan.result.cover ? (
                          <img
                              className=""
                              height="80px"
                              width="80px"
                              src={perusahaan.result.cover}
                              alt="perusahaan Cover"
                          />
                      ) : (
                          <img
                              className=""
                              height="80px"
                              width="80px"
                              src="https://via.placeholder.com/640x480.png/00cc55?text=animals+ipsam"
                              alt="Placeholder Image"
                          />
                      )
                  }

              </>
          ) : (
              <img
              className=""
              height="80px"
              width="80px"
              src="https://via.placeholder.com/640x480.png/00cc55?text=animals+ipsam"
              alt="perusahaan Cover"
          />
          )}
          </div>
          <div className="flex flex-col items-center border-b py-4">
            <h1 className="font-semibold text-slate-800 text-lg">{perusahaan.result.name_perusahaan}</h1>
            <h2 className="text-slate-500 text-sm">{perusahaan.result.bio}</h2>
            <h2 className="text-slate-500 text-sm">{perusahaan.result.telepon}</h2>
            <h2 className="text-slate-500 text-sm">{perusahaan.result.email}</h2>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-500">
                Berdiri Sejak 
              </label>
              <h1 className="text-lg font-bold">{perusahaan.result.tahun_berdiri}</h1>
            </div>
          </div>  
          <div className="flex flex-col">
            <div className="flex justify-center items-center p-4">
              <Button 
                name="Lihat"
                height="h-10"
                width="w-20"
                bgColor="bg-slate-400"
                textColor="text-white"
                fontSize="font-semibold"
                href={`/perusahaan/${perusahaan.result.id}`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
