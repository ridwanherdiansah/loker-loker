import React, { useEffect, useRef } from "react";
import { useState } from "react";
import IconPlus from "@/component/icon/plus";
import IconClose from "@/component/icon/close";
import Modal from "@/component/modal/modal";
import Input from "@/component/form/input";
import Button from "@/component/button";
import KeahlianNetwork from "@/network/KeahlianNetwork";
export default function CardKeahlian({ user }){
    const formRef = useRef();
    const [modalKeahlian, setModalKeahlian] = useState(false)
    const [error, setError] = useState([]);
    const [name, setName] = useState("");


    const validateInputs = () => {
        const validasiErrors = {};
        if (!name) {
            validasiErrors.name = "Name Kehalian tidak boleh kosong";
        } else if (name.length > 50) {
            validasiErrors.name = "Name tidak boleh lebih dari 50 karakter";
        }

        return validasiErrors;
    }

    const formSumbmitKeahlian = async (event) => {
        event.preventDefault();
        const validasiErrors = validateInputs();
        if (Object.keys(validasiErrors).length === 0) {
            const keahlian = {
                id: user.id,
                name: name
            }

            const response = await KeahlianNetwork.create(keahlian);
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

    const [keahlian, setKeahlian] = useState([]);
    const fetchKeahlian = async (id) => {
        try {
            const response = await KeahlianNetwork.show(id);
            setKeahlian(response.data);
        } catch (error) {
            console.error("error keahlian", error);
        }
    }

    useEffect(() => {
        if (user?.id) {
            fetchKeahlian(user.id);
        }
    }, [user]);


    const setHapus = async (id) => {
        const response = await KeahlianNetwork.destroy(id);
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
            <div className="rounded-lg bg-white p-4">
                        <h1 className="font-semibold text-slate-800 text-lg">Keahlian</h1>
                        <div className="flex justify-between">
                            <label className="text-sm font-semibold text-slate-500">
                                
                            </label>
                            <div
                                className="cursor-pointer"
                                onClick={() => setModalKeahlian(true)}
                            >
                                <IconPlus height="30" width="30" fill="bg-grayy" />
                            </div>
                        </div>
                            <div className="flex flex-wrap p-2">
                            {keahlian.map((data, key) => {
                                return(
                                    <div key={key} className="rounded-lg border p-4 flex items-center bg-slate-100 m-2">
                                        <p className="mx-2">{data.name_keahlian}</p>
                                        <div
                                            className="cursor-pointer"
                                            onClick={() => setHapus(data.id)} 
                                        >
                                        <IconClose height="20" width="20" fill="bg-gray" />
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                    </div>

                    <Modal
                        Judul="Tambahkan Keahlian"
                        isVisible={modalKeahlian}
                        onClose={() => setModalKeahlian(false)}
                    >
                        <form ref={formRef} onSubmit={formSumbmitKeahlian}>


                        <div className="flex flex-col space-y-2">
                            <div className="flex flex-col space-y-2">
                            <label className="text-base text-slate-800">Nama Keahlian</label>
                            <Input
                                type="text"
                                height="h-10"
                                width="w-full"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                error={error.name}
                            />
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