import React, { useEffect, useState } from "react";
import HeaderProfile from "@/component/layout/header/headerProfile";
import CardLoker from "@/component/card/CardLoker/cardLoker";
import LokerNetwork from "@/network/LokerNetwork";
import UserNetwork from "@/network/UserNetwork";
import CardCreateLoker from "@/component/card/CardLoker/cardCreateLoker";
import Button from "@/component/button";
import Link from "next/link";
export default function index(){
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
            console.error('error loker index', error);
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
  }, [userAuth]);
  
    return(
        <div className="bg-slate-100">
        <HeaderProfile user={user} />
        <div className="flex px-24 py-4"> 
            <div className="w-2/6 py-4 px-2">
                <div className="bg-white rounded-lg p-2 flex flex-col px-4 py-4">
                <Button 
                    href="/loker"
                    name="Tambah" 
                    height="h-10" 
                    width="w-full" 
                    bgColor="bg-blue-500" 
                    textColor="text-white" 
                    fontSize="font-semibold"
                />
                <CardCreateLoker idUser={userAuth} />
                </div>
            </div>
            <div className="w-4/6 py-4 px-2">
            <h1 className="mb-8 font-bold text-xl">Lowongan Pekerjaan</h1>
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
    )
}