import React, { useEffect, useRef, useState } from "react";
import Modal from "@/component/modal/modal";
import Input from "@/component/form/input";
import Button from "@/component/button";
import IconPlus from "@/component/icon/plus";
import IconTrash from "@/component/icon/trash";
import PengalamanNetwork from "@/network/PengalamanNetwork";
import swal from "sweetalert";
export default function CardPengalaman({user}){
    const formRef = useRef();
    const [ModalPengalaman, setModalPengalaman] = useState(false);
    const [error, setError] = useState([]);
    const [posisi, setPosisi] = useState("");
    const [jenisPekerjaan, setJenisPekerjaan] = useState("");
    const [namaPerusahaan, setNamaPerusahaan] = useState("");
    const [lokasi, setLokasi] = useState("");
    const [tanggalMulai, setTanggalMulai] = useState("");
    const [tanggalBerakhir, setTanggalBerakhir] = useState("");

    const validateInputs = () => {
        const validasiErrors = {};
        if (!posisi) {
            validasiErrors.posisi = "Posisi tidak boleh kosong";
        } else if (posisi.length > 50 ) {
            validasiErrors.posisi = "Posisi tidak boleh lebih dari 50 karakter";
        }
        if (!jenisPekerjaan) {
            validasiErrors.jenisPekerjaan = "Jenis Pekerjaan tidak boleh kosong";
        } else if (jenisPekerjaan.length > 50) {
            validasiErrors.jenisPekerjaan = "Jenis Pekerjaan tidak boleh lebih dari 50 karakter";
        }
        if (!namaPerusahaan) {
            validasiErrors.namaPerusahaan = "Nama perusahaan tidak boleh kosong";
        } else if (namaPerusahaan.length > 50 ) {
            validasiErrors.namaPerusahaan = "Nama perusahaan tidak boleh lebih dari 50 karakter";
        }
        if (!lokasi) {
            validasiErrors.lokasi = "Lokasi tidak boleh kosong";
        } else if (lokasi.length > 50) {
            validasiErrors.lokasi = "Lokasi tidak boleh dari 50 karakter";
        }
        if (!tanggalMulai) {
            validasiErrors.tanggalMulai = "tanggal mulai tidak boleh kosong";
        }
        if (!tanggalBerakhir) {
            validasiErrors.tanggalBerakhir = "tanggal berakhir tidak boleh kosong";
        }            

        return validasiErrors;
    }

    const formSumbmitPengalaman = async(event) => {
        event.preventDefault();
        const validasiErrors = validateInputs();
        if (Object.keys(validasiErrors).length === 0) {
            const pengalaman = {
                id: user.id,
                posisi: posisi,
                jenisPekerjaan: jenisPekerjaan,
                namaPerusahaan: namaPerusahaan,
                lokasi: lokasi,
                tanggalMulai: tanggalMulai,
                tanggalBerakhir: tanggalBerakhir
            }

            const response = await PengalamanNetwork.create(pengalaman);
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

    const [pengalaman, setPengalaman] = useState([]);
    const fetchPengalaman = async(id) => {
        try {
            const response = await PengalamanNetwork.show(id);
            setPengalaman(response.data);
        } catch (error) {
            console.error('error pengalaman', error)
        }
    }

    useEffect(() => {
        if (user?.id) {
            fetchPengalaman(user.id);
        }
    }, [user]);
    
    const setHapus = async (id) => {
        const response = await PengalamanNetwork.destroy(id);
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
            <h1 className="font-semibold text-slate-800 text-lg">Pengalaman</h1>
            <div className="flex justify-between">
                <label className="text-sm font-semibold text-slate-500">
                    
                </label>
                <div
                    className="cursor-pointer"
                    onClick={() => setModalPengalaman(true)}
                >
                    <IconPlus height="30" width="30" fill="bg-grayy" />
                </div>
            </div>
            {pengalaman.map((data, key) => (
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
                                {data.jenis_pekerjaan}
                                </h1>
                                <h2 className="text-slate-500 text-sm">{data.nama_perusahaan}</h2>
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
            ))}
            
            <Modal
                Judul="Tambahkan Pengalaman"
                isVisible={ModalPengalaman}
                onClose={() => setModalPengalaman(false)}
            >
                <form ref={formRef} onSubmit={formSumbmitPengalaman}>
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-col space-y-2">
                    <label className="text-base text-slate-800">Posisi</label>
                    <Input
                        type="text"
                        height="h-10"
                        width="w-full"
                        onChange={(e) => {
                        setPosisi(e.target.value);
                        }}
                        error={error.posisi}
                    />
                    </div>
                    <div className="flex flex-col space-y-2">
                    <label className="text-base text-slate-800">
                        Jenis Pekerjaan
                    </label>
                    <Input
                        type="text"
                        height="h-10"
                        width="w-full"
                        onChange={(e) => {
                        setJenisPekerjaan(e.target.value);
                        }}
                        error={error.jenisPekerjaan}
                    />
                    </div>
                    <div className="flex flex-col space-y-2">
                    <label className="text-base text-slate-800">Nama Perusahan</label>
                    <Input
                        type="text"
                        height="h-10"
                        width="w-full"
                        onChange={(e) => {
                        setNamaPerusahaan(e.target.value);
                        }}
                        error={error.namaPerusahaan}
                    />
                    </div>
                    <div className="flex flex-col space-y-2">
                    <label className="text-base text-slate-800">Lokasi</label>
                    <Input
                        type="text"
                        height="h-10"
                        width="w-full"
                        onChange={(e) => {
                        setLokasi(e.target.value);
                        }}
                        error={error.lokasi}
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