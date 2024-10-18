import React, { useEffect, useState } from "react";
import Button from "@/component/button";
import Link from "next/link";
import LokerNetwork from "@/network/LokerNetwork";
import { data } from "autoprefixer";
export default function index({ idUser }){
    const [counter, setCounter] = useState(1);

    const [lokerUser, setLokerUser] = useState([]);
    const fetchLokerUser = async (page = 1) => {
        try {
            const response = await LokerNetwork.user({ page, idUser });
            setLokerUser(response.data);
            setCounter(page)
        } catch (error) {
            console.error("error loker user", error);
        }
    }
    
    const clickNextPage = async () => {
        const nextPage = counter + 1 ;
        await fetchLokerUser(nextPage);
    }

    useEffect(() => {
        if (idUser) {
            fetchLokerUser();
        }
    }, [idUser]);

    return(
        <>  
            {!lokerUser ? (
                <>
                    <h1 className="mt-6 mb-4 border-b-4 pb-2 font-bold text-base">Anda belum punya lowongan pekerjaan</h1>
                </>
            ) : (
                <>
                <h1 className="mt-6 mb-4 border-b-4 pb-2 font-bold text-xl">Lowongan Pekerjaan Anda</h1>
                {lokerUser.map((data, key) => {
                    return(
                        <Link href={`/loker/${data.id}`} key={key} className="my-2">
                            <div className="flex items-center border-b-2 py-2">
                                <img
                                    height="50px"
                                    width="50px"
                                    src={data.cover}
                                />
                                <div className="flex flex-col mx-4">
                                    <h1 className="font-semibold text-sm text-black">{data.name_loker}</h1>
                                    <h2 className="text-xs text-slate-500">{data.name_perusahaan}</h2>
                                </div>
                                <div className="text-left ml-auto">
                                    <h1 className="font-bold">{data.jumlahPelamar}</h1>
                                </div>
                            </div>
                        </Link>
                    )
                })}
                
                <div className="flex justify-center py-4">
                    <Button 
                        onClick={() => clickNextPage()}
                        name="Lainnya"
                        height="h-5"
                        width="w-20"
                        bgColor="bg-slate-100"
                        textColor="text-slate-500"
                        fontSize="text-xs"
                    />
                </div>
                </>
            )}
            
        </>
    )
}