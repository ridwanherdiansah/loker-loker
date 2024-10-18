import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HeaderProfile from "@/component/layout/header/headerProfile";
import CardProfilePrusahaan from "@/component/card/CardPerusahaan/cardProfilePrusahaan";
import Image from "@/component/image";
import Link from "next/link";
import LokerNetwork from "@/network/LokerNetwork";
import PerusahaanNetwork from "@/network/PerusahaanNetwork";
import CardLoker from "@/component/card/CardLoker/cardLoker";
export default function Index() {
  const router = useRouter();
  const { id } = router.query;

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

  const [perusaahaan, setPerusahaan] = useState([]);
  const fetchPerusahaan = async (id) => {
    try {
      const response = await PerusahaanNetwork.id(id);
      setPerusahaan(response.data);
    } catch (error) {
      console.error('error prusahaan', error);
    }
  }

  const [loker, setLoker] = useState([]);
  const fetchLoker = async (id) => {
    try {
      const response = await LokerNetwork.perusahaan(id);
      setLoker(response.data);
    } catch (error) {
      console.error('error perusahan loker', error);
    }
  }
  
  useEffect(() => {
    const userSession = JSON.parse(sessionStorage.getItem('userAuth'));
    setUserAuth(userSession);
  }, []);

  useEffect(() => {
    if (id && userAuth) {
      fetchUser(userAuth)
      fetchPerusahaan(id); 
      fetchLoker(id);
    }
  }, [id, userAuth])
  
  console.log(userAuth);
  return (
    <div className="bg-slate-100">
      <HeaderProfile user={user} />
      <div className="flex px-24 py-4">
        <div className="w-2/6 py-4 px-2">
          <CardProfilePrusahaan idUser={userAuth} perusahaan={perusaahaan} />
        </div>
        <div className="w-4/6 py-4 px-2 flex flex-col space-y-4">
          <div className="bg-white rounded-lg p-4">
          <Link
            href={`/profile/perusahaan/${perusaahaan.id}`}
            className=" border-b my-2 flex items-center p-2"
          >
            <div className="">
              <Image
                height="50px"
                width="50px"
                src={perusaahaan.cover}
              />
            </div>
            <div className="flex flex-col mx-4">
              <h1 className="font-semibold text-sm text-black">{perusaahaan.name_perusahaan}</h1>
              <h2 className="text-xs text-slate-500">{perusaahaan.alamat}</h2>
            </div>
          </Link>
          
          <div className="flex flex-col my-4">
            <label className="font-semibold text-xl text-slate-700 mb-4">Gambaran Umum</label>
            <p>
              {perusaahaan.bio}
            </p>
          </div>
          <div className="my-2">
            <label className="font-semibold text-xl text-slate-700 mb-4">Website</label>
            <h1>{perusaahaan.website}</h1>
          </div>
          <div className="my-2">
            <label className="font-semibold text-xl text-slate-700 mb-4">Telepon</label>
            <h1>{perusaahaan.telepon}</h1>
          </div>
          <div className="my-2">
            <label className="font-semibold text-xl text-slate-700 mb-4">Tahun Berdiri</label>
            <h1>{perusaahaan.tahun_berdiri}</h1>
          </div>
          </div>

          <div className="bg-white rounded-lg p-4">
          <label className="font-semibold text-xl text-slate-700">Loker</label>
            {loker.map((data, key) => {
              return(
                  <div key={key}>
                      <CardLoker
                          nameLoker={data.name_loker}
                          cover={data.cover}
                          namePerusahaan={data.name_perusahaan}
                          deskripsi={data.deskripsi}
                          id={data.id} 
                      />
                  </div>
              )
            })}
          </div>
        </div>
        </div>
      </div>
  );
}
