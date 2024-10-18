import PelamarNetwork from "@/network/PelamarNetwork";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/component/button/";
import * as XLSX from 'xlsx';
export default function index({ idLoker }){
    const [pelamar, setPelamar] = useState([]);
    const fetchPelamar = async (idLoker) => {
        try {
            const response = await PelamarNetwork.loker(idLoker);
            setPelamar(response.data);
        } catch (error) {
            console.error(("pelamar error", error));
        }
    }

    useEffect(() => {
        if (idLoker) {
            fetchPelamar(idLoker);
        }
    }, [idLoker]);

    const onExport = async (idLoker) => {
        const data = await PelamarNetwork.exportData(idLoker);

        // Membuat worksheet dari data
        const worksheet = XLSX.utils.json_to_sheet(data);
    
        // Membuat workbook dan menambahkan worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    
        // Menyimpan workbook sebagai file Excel
        XLSX.writeFile(workbook, `DataLoker_${idLoker}.xlsx`);
    };

    return(
        <>
            <div className=" bg-white rounded-lg p-2">
                <div className="flex justify-between">
                <label className="font-semibold text-xl text-slate-700">Pelamar</label>
                <Button 
                    onClick={() => onExport(idLoker)}
                    name="Export"
                    bgColor="bg-green-500"
                    textColor="text-white"
                    height="h-10"
                    width="w-20"
                />
                </div>
                {pelamar.map((data,key) => {
                return(
                    <div key={key}>
                    <div className=" border-b my-2 flex items-center p-2"
                    >
                    <div className="">
                    {!data.cover ? (
                        <img
                            height="50px"
                            width="50px"
                            src="https://via.placeholder.com/640x480.png/00cc55?text=animals+ipsam"
                            alt={data.name}
                        />
                    ) : (
                        <img
                            height="50px"
                            width="50px"
                            src={data.cover}
                            alt={data.name}
                        />
                    )}                      
                    </div>
                        <div className="flex flex-col mx-4">
                            <h1 className="font-semibold text-sm text-black">{data.name}</h1>
                            <h2 className="text-xs text-slate-500">{data.email}</h2>
                            <h2 className="text-xs text-slate-500">{data.telepon}</h2>
                        </div>
                    </div>
                    </div>
                )
                })}
            </div>
        </>
    )
}