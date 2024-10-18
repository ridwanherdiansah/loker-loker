import React, { useEffect, useRef } from "react";
import { useState } from "react";
import IconPlus from "@/component/icon/plus";
import IconTrash from "@/component/icon/trash";
import Modal from "@/component/modal/modal";
import Input from "@/component/form/input";
import Button from "@/component/button";
import PendidikanNetwork from "@/network/PendidikanNetwork";
export default function CardPendidikan({user}){
    const formRef = useRef();
    const [error, setError] = useState([]);
    const [ModalPendidikan, setModalPendidikan] = useState(false);
    const [namaJurusan, setNamaJurusan] = useState("");
    const [namaSekolah, setNamaSekolah] = useState("");
    const [tanggalMulai, setTanggalMulai] = useState("");
    const [tanggalBerakhir, setTanggalBerakhir] = useState("");

    const validateInputs = () => {
        const validasiErrors = {};
        if (!namaJurusan) {
            validasiErrors.namaJurusan = "Nama jurusan tidak boleh kosong";
        } else if (namaJurusan.length > 50) {
            validasiErrors.namaJurusan = "Nama jurusan tidak boleh lebih dari 50 karakter";
        } if (!namaSekolah) {
            validasiErrors.namaSekolah = "Nama sekolah tidak boleh kosong";
        } else if (namaSekolah.length > 50) {
            validasiErrors.namaSekolah = "Nama sekolah tidak boleh lebih dari 50 karakter";
        } if (!tanggalMulai) {
            validasiErrors.tanggalMulai = "Tanggal mulai harus di isi";
        } if (!tanggalBerakhir) {
            validasiErrors.tanggalBerakhir = "Tanggal berakhir harus di isi";
        }
        return validasiErrors;
    }

    const formSumbmitPendidikan = async (event) => {
        event.preventDefault();
        const validasiErrors = validateInputs();
        if (Object.keys(validasiErrors).length === 0) {
            const pendidikan = {
                id: user.id,
                namaJurusan: namaJurusan,
                namaSekolah: namaSekolah,
                tanggalMulai: tanggalMulai,
                tanggalBerakhir: tanggalBerakhir
            }

            const response = await PendidikanNetwork.create(pendidikan);
            if (response.data.code == 200) {
                const message = response.data.message;
                swal(message, {
                    icon: "success",
                }).then(() => {
                    location.reload();
                });
            } else {
                const message = response.data.message;
                swal(message, {
                    icon: "error",
                });
            }
        } else {
         setError(validasiErrors);   
        }
    }

    const [pendidikan, setPendidikan] = useState([]);
    const fetchPendidikan = async (id) => {
        try {
            const response = await PendidikanNetwork.show(id);
            setPendidikan(response.data);
        } catch (error) {
            console.error("error pendidikan", error);
        }
    }

    useEffect(() => {
        if (user?.id) {
            fetchPendidikan(user.id)
        }
    }, [user]);

    const setHapus = async (id) => {
        const response = await PendidikanNetwork.destroy(id);
        if (response.data.code == 200) {
            const message = response.data.message;
            swal(message, {
                icon: "success",
            }).then(() => {
                location.reload();
            });
        } else {
            const message = response.data.message;
            swal(message, {
                icon: "error",
            });
        }
    }

    return(
        <>
            <h1 className="font-semibold text-slate-800 text-lg">Pendidikan</h1>
            <div className="flex justify-between">
                <label className="text-sm font-semibold text-slate-500">
                    
                </label>
                <div
                    className="cursor-pointer"
                    onClick={() => setModalPendidikan(true)}
                >
                    <IconPlus height="30" width="30" fill="bg-grayy" />
                </div>
            </div>
            {pendidikan.map((data, key) => {
                return (
                <div key={key} className="rounded-lg p-4 border-b-2">
                    <div className="flex space-x-4 justify-between">
                        <div className="flex">
                            <div className="m-4">
                                <img
                                height="50px"
                                width="50px"
                                src="https://jasalogocepat.com/wp-content/uploads/2023/09/logo-bumn-tanpa-background-1-jasalogocepat-768x253.png"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <h1 className="font-semibold text-lg text-slate-800">
                                {data.nama_jurusan}
                                </h1>
                                <h2 className="text-slate-500 text-sm">{data.nama_sekolah}</h2>
                                <div className="flex space-x-2">
                                <p className="text-slate-500 text-xs">
                                    {data.tanggal_masuk}
                                </p>
                                <p className="text-slate-500 text-xs">
                                    {data.tanggal_keluar}
                                </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => setHapus(data.id)} 
                        >
                            <IconTrash height="30" width="30" fill="bg-grayy" />
                        </div>
                    </div>
                </div>
                );
            })}
            
            <Modal
                Judul="Tambahkan Pengalaman"
                isVisible={ModalPendidikan}
                onClose={() => setModalPendidikan(false)}
            >
                <form ref={formRef} onSubmit={formSumbmitPendidikan }>
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-col space-y-2">
                    <label className="text-base text-slate-800">Nama Jurusan</label>
                    <Input
                        type="text"
                        height="h-10"
                        width="w-full"
                        onChange={(e) => {
                            setNamaJurusan(e.target.value);
                        }}
                        error={error.namaJurusan}
                    />
                    </div>
                    <div className="flex flex-col space-y-2">
                    <label className="text-base text-slate-800">Nama Sekolah</label>
                    <Input
                        type="text"
                        height="h-10"
                        width="w-full"
                        onChange={(e) => {
                            setNamaSekolah(e.target.value);
                        }}
                        error={error.namaSekolah}
                    />
                    </div>
                    <div className="flex justify-between space-x-2 ">
                    <div className="flex flex-col space-y-2 w-full">
                        <label className="text-base text-slate-800">
                        Tanggal Mulai
                        </label>
                        <Input
                        type="date"
                        height="h-10"
                        width="w-full"
                        onChange={(e) => {
                            setTanggalMulai(e.target.value);
                        }}
                        error={error.tanggalMulai}
                        />
                    </div>
                    <div className="flex flex-col space-y-2 w-full">
                        <label className="text-base text-slate-800">
                        Tanggal Berakhir
                        </label>
                        <Input
                        type="date"
                        height="h-10"
                        width="w-full"
                        onChange={(e) => {
                            setTanggalBerakhir(e.target.value);
                        }}
                        error={error.tanggalBerakhir}
                        />
                    </div>
                    </div>
                    <Button
                    name="Simpan"
                    height="h-10"
                    width="w-24"
                    bgColor="bg-blue-500"
                    textColor="text-white"
                    fontSize="font-semibold"
                    type="submit"
                    />
                </div>
                </form>
            </Modal>
        </>
    )
}