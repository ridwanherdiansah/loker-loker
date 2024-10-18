import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HeaderProfile from "@/component/layout/header/headerProfile";
import Carduser from "@/component/card/CardUser";
import CardLoker from "@/component/card/CardLoker/cardLoker";
import CardPrusahaan from "@/component/card/CardPerusahaan/cardPerusahaan";
import LokerNetwork from "@/network/LokerNetwork";
import PerusahaanNetwork from "@/network/PerusahaanNetwork";
export default function Index(){
  const router = useRouter();
  const {id} = router.query;

  const [loker, setLoker] = useState([]);
  const fetchLoker = async (id) => {
    try {
      const response = await LokerNetwork.show(id);
      setLoker(response.data);
    } catch (error) {
      console.error("Error fetching campaign show:", error);
    }
  }

  const [perusahaan, setPerusahaan] = useState([]);
  const fetchPerusahaan = async () => {
    try {
      const response = await PerusahaanNetwork.get();
      setPerusahaan(response.data);
    } catch (error) {
      console.error('error perusahaan', error);
    }
  }
  
  useEffect(() => {
    if (id) {
      fetchLoker(id);
      fetchPerusahaan();
    }
  }, [id])

  return(
    <div className="bg-slate-100">
      <HeaderProfile />
      <div className="flex px-24 py-4"> 
        <div className="w-4/6 py-4 px-2">
          <CardLoker
            nameLoker={loker.name_loker}
            cover={loker.cover}
            namePerusahaan={loker.name_perusahaan}
            deskripsi={loker.deskripsi}
            id={loker.id} 
          />
        </div>
        <div className="w-2/6 py-4 px-2">
          <CardPrusahaan list={perusahaan} />
        </div>
      </div>
    </div>
  )
}