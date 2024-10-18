import React, { useEffect, useState } from "react";
import Link from "next/link";
import Search from "@/component/icon/search";
import User from "@/component/icon/user";
import Image from "@/component/image";
export default function HeaderProfile({ user }) {
  return (
    <div className="flex border px-24 py-2 bg-white">
      <div className="w-1/3 flex">
        <div className="h-10 w-32 flex items-center px-2">
          <Image
            width="100px"
            src="../logss.png"
          />
        </div>
        <Link
          href="/search"
          className="border h-10 w-64 flex items-center px-2 rounded-lg"
        >
          <Search height="20" width="20" fill="gray" />
          <label className="font-semibold text-slate-500 mx-4">Search</label>
        </Link>
      </div>
      <div className=" w-1/2 flex items-center justify-around">
        <Link href="/profile/halamanUtama/">
          <label className=" cursor-pointer font-semibold text-slate-500">
            Halaman Utama
          </label>
        </Link>
        <Link href="/profile/perusahaan/">
          <label className=" cursor-pointer font-semibold text-slate-500">
            Perusahaan
          </label>
        </Link>
        <Link href="/profile/pekerjaan/">
          <label className=" cursor-pointer font-semibold text-slate-500">
            Pekerjaan
          </label>
        </Link>
      </div>
      <div className="w-1/4 flex items-center justify-end">
        <Link href={`/profile/akun/${user.id}`} className="flex items-center">
          <label className="font-semibold text-slate-500 mx-4">User</label>
          <User height="40" width="40" fill="gray" />
        </Link>
      </div>
    </div>
  );
}
