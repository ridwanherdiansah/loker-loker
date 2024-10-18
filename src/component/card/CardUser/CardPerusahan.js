import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function index({ perusahaan }){
  return(
    <>
    <div className=" bg-white rounded-lg p-2">
      <label className="font-semibold text-xl text-slate-700">Perusahaan</label>
        {perusahaan.map((data,key) => {
          return(
            <div key={key}>
            <Link
              href={`/profile/perusahaan/${data.id}`}
              className=" border-b my-2 flex items-center p-2"
            >
              <div className="">
              {!data.cover ? (
                  <img
                      height="50px"
                      width="50px"
                      src="https://via.placeholder.com/640x480.png/00cc55?text=animals+ipsam"
                      alt={data.name_perusahaan}
                  />
              ) : (
                  <img
                      height="50px"
                      width="50px"
                      src={data.cover}
                      alt={data.name_perusahaan}
                  />
              )}                      
              </div>
              <div className="flex flex-col mx-4">
                <h1 className="font-semibold text-sm text-black">{data.name_perusahaan}</h1>
                <h2 className="text-xs text-slate-500">{data.alamat}</h2>
              </div>
            </Link>
            </div>
          )
        })}
    </div>
    </>
  )
}