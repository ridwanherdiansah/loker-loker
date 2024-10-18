import React, { useEffect, useState } from "react";
import Image from "@/component/image";
import Link from "next/link";
import Button from "@/component/button";
import HeaderProfile from "@/component/layout/header/headerProfile";
import Carduser from "@/component/card/CardUser";
import LokerNetwork from "@/network/LokerNetwork";
import PerusahaanNetwork from "@/network/PerusahaanNetwork";
import UserNetwork from "@/network/UserNetwork";

export default function Index() {
  const [userAuth, setUserAuth] = useState([]);

  const [user, setUser] = useState([]);
  const fetchUser = async(userAuth) => {
    try {
      const response = await UserNetwork.show(userAuth);
      setUser(response.data);
    } catch (error) {
      console.error('error user', error);
    }
  }


  const [loker, setLoker] = useState([]);
  const fetchLoker = async () => {
    try {
      const response = await LokerNetwork.loker();
      setLoker(response.data);
    } catch (error) {
      console.error('loker error', error);
    }
  }

  const [perusahaan, setPerusahaan] = useState([]);
  const fetchPerusahaan = async () => {
    try {
      const response = await PerusahaanNetwork.get();
      setPerusahaan(response.data);
    } catch (error) {
      console.error('perusahaan error', error);
    }
  }

  useEffect(() => {
    const userSession = JSON.parse(sessionStorage.getItem('userAuth'));
    setUserAuth(userSession);
  }, []);

  useEffect(() => {
    if (userAuth) {
      fetchUser(userAuth);
    }
    fetchLoker();
    fetchPerusahaan();
  }, [userAuth]);

  return (
    <div className="bg-slate-100">
      <HeaderProfile user={user} />
      <div className="flex px-24 py-4">
        <div className="w-2/6 py-4 px-2">
          <Carduser user={user} />
        </div>
        <div className="w-4/6 py-4 px-2">
          {loker.map((data, key) => {
            return(
              <div key={key}>
                  <Link href={`pekerjaan/${data.id}`}>
                    <div className="bg-white rounded-lg p-2 flex flex-col space-y-2 px-4 mb-4">
                      <div className="flex items-center">
                        <Image
                          height="50px"
                          width="50px"
                          src={data.cover}
                        />
                        <div className="flex flex-col mx-4">
                          <h1 className="font-semibold text-sm text-black">{data.name_loker}</h1>
                          <h2 className="text-xs text-slate-500">{data.name_perusahaan}</h2>
                        </div>
                      </div>
                      <div className="line-clamp-2" dangerouslySetInnerHTML={data.deskripsi ? { __html: data.deskripsi } : { __html: '' }}></div>
                      <div className="flex space-x-3 border-t pt-4">
                        <Button
                          name="Lihat"
                          height="h-10"
                          width="w-24"
                          bgColor="bg-blue-500"
                          textColor="text-white"
                          fontSize="font-bold"
                        />
                      </div>
                    </div>
                  </Link>
              </div>
            )
          })}
        </div>
        <div className="w-2/6 py-4 px-2">
            <div className=" bg-white rounded-lg p-2">
            <label className="font-semibold text-xl text-slate-700">Perusahaan</label>
              {perusahaan.map((data,key) => {
                return(
                  <div key={key}>
                  <Link
                    href={`/profile/perusahaan/${data.id}`}
                    className=" border-b my-2 flex items-center p-2"
                  >
                    <div className="h-20 w-20">
                      {!data.cover ? (
                          <Image
                            height="50px"
                            width="50px"
                            src="https://via.placeholder.com/640x480.png/00cc55?text=animals+ipsam"
                            alt={data.name_perusahaan}
                          />
                      ) : (
                        <Image
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
        </div>
      </div>
    </div>
  );
}
