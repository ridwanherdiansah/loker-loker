import React from "react";
import Link from "next/link";
import Image from "@/component/image";
export default function CardLokerPerusahaan({ data }) {
  return (
    <>
      <div className="bg-white rounded-lg p-2 flex flex-col space-y-2 px-4">
        <h1 className="text-2xl font-semibold text-slate-900">
          Pilihan Lowongan terbaik untuk anda
        </h1>
        <p className="text-sm text-slate-500">Berdasarkan yang terbaru</p>
        <div className="flex flex-col">
          <Link href="/profile/detail/1">
            <div className="flex items-center border-b mt-4 pb-4 hover:bg-blue-100 p-4 cursor-pointer">
              <div>
                <Image
                  height="50px"
                  width="50px"
                  src="https://cdn-icons-png.freepik.com/512/3177/3177440.png"
                />
              </div>
              <div className="flex flex-col mx-4 space-y-2">
                <div className="font-semibold text-lg">Nama perusahaan</div>
                <div className="text-sm">Nama loker</div>
                <div className="text-sm text-slate-500">Tanggal Posting</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
