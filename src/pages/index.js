import React, { useEffect, useState } from "react";
import CardPerusahaan from "@/component/card/CardPerusahaan";
import CardLoker from "@/component/card/CardLoker";
import Header from "@/component/layout/header";
import LokerNetwork from "@/network/LokerNetwork";
import { data } from "autoprefixer";
export default function index() {
  const [counter, setCounter] = useState(1);
  
  const [loker, setLoker] = useState([]);
  const fetchLoker = async(page) => {
    try {
      const response = await LokerNetwork.loker({page});
      setLoker(response.data);
      setCounter(page);
    } catch (error) {
      console.error('error FetchLoker', error);
    }
  }

  const [lokerNew, setLokerNew] = useState([]);
  const fetchLokerNew = async () => {
    try {
      const response = await LokerNetwork.lokerNew();
      setLokerNew(response.data);
    } catch (error) {
      console.error('error loker new', error);
    }
  }

  useEffect(() => {
    fetchLoker();
    fetchLokerNew();
  }, []);

  return (
    <>
      <Header />
      <div className="flex border px-24 py-8">
        <div className="w-1/2 p-4">
          <div className="flex flex-col">
            {loker.map((data, key) => {
              return(   
              <div key={key}>   
                <CardPerusahaan
                  keahlian={data.name_loker}
                  perusahaan={data.name_perusahaan}
                  kota={data.alamat}
                  tanggal={data.created_at}
                  id={data.id}
                  src={data.cover}
                />
              </div>
              )
            })}
          </div>
        </div>
        <div className="w-1/2 p-4">
          <div className="scroll-smooth focus:scroll-auto">
            <CardLoker
              src={lokerNew.cover}
              keahlian={lokerNew.name_loker}
              perusahaan={lokerNew.name_perusahaan}
              kota={lokerNew.alamat}
              tanggal={lokerNew.created_at}
              id={lokerNew.id}
              deskripsi={lokerNew.deskripsi}
            />
          </div>
        </div>
      </div>
    </>
  );
}
