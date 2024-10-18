import React, { useEffect, useRef, useState } from "react";
import UserNetwork from "@/network/UserNetwork";
import HeaderProfile from "@/component/layout/header/headerProfile";
import Button from "@/component/button";
import Input from "@/component/form/input";
import QuillEditor from "@/component/form/QuillEditor";
import LokerNetwork from "@/network/LokerNetwork";
import swal from "sweetalert";
import CardCreateLoker from "@/component/card/CardLoker/cardCreateLoker";
export default function index(){
    const formRef = useRef();
    const [deskripsi, setDeskripsi] = useState("");
    const [nameLoker, setNameLoker] = useState("");
    const [cover, setCover] = useState("");
    const [error, setError] = useState({});

    const validateInputs = () => {
        const validasiErrors = {};
            if (!cover) {
                validasiErrors.cover = "Input cover tidak boleh kosong"
            }
            if (!nameLoker) {
                validasiErrors.nameLoker = "Name Loker tidak boleh kosong"
            } else if (nameLoker.length > 50) {
                validasiErrors.nameLoker = "Name loker tidak boleh lebih dari 50 karakter"
            }
            if (!deskripsi.trim()) {
                validasiErrors.deskripsi = 
                "Deskripsi harus di isi";
            }

        return validasiErrors;
    }

    const formSubmit = async (event) => {
        event.preventDefault();
        const validasiErrors = validateInputs();
        if (Object.keys(validasiErrors).length === 0) {
            const data = {
                idUser: userAuth,
                cover: cover,
                nameLoker: nameLoker,
                deskripsi: deskripsi
            }

            const response = await LokerNetwork.post(data);
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

    useEffect(() => {
        const userSession = JSON.parse(sessionStorage.getItem('userAuth'));
            setUserAuth(userSession);
        }, []);
    
      useEffect(() => {
        if (userAuth) {
          fetchUser(userAuth);
        }
      }, [userAuth]);
      
    return(
        <>
            <div className="bg-slate-100">
                <HeaderProfile user={user} />
                <div className="flex px-24 py-4"> 
                    <div className="w-4/6 py-4 px-2">
                        <div className="bg-white rounded-lg p-2 flex flex-col px-4 py-4">
                            <h1 className="mb-4 border-b-4 pb-2 font-bold text-base">Buat Lowongan Pekerjaan</h1>
                            <div>
                                <form ref={formRef} onSubmit={formSubmit} encType="multipart/form-data">
                                <div className="flex flex-col p-2 w-full">
                                    <label className="text-base text-slate-800">Cover</label>
                                    <Input 
                                        type="file"
                                        height="h-12"
                                        width="w-full"
                                        onChange={(e) => setCover(e.target.files[0])}
                                        error={error.cover}
                                    />
                                </div>
                                <div className="flex flex-col p-2 w-full">
                                    <label className="text-base text-slate-800">Nama Lowongan Kerja</label>
                                    <Input 
                                        type="text"
                                        height="h-10"
                                        width="w-full"
                                        onChange={(e) => setNameLoker(e.target.value)}
                                        error={error.nameLoker}
                                    />
                                </div>
                                <div className="flex flex-col p-2 w-full">
                                    <label className="text-base text-slate-800">Deskripsi</label>
                                    <QuillEditor value={deskripsi} onChange={setDeskripsi} />
                                    <span className="text-[16px] text-red-500 ">{error.deskripsi}</span>
                                </div>
                                <div className="flex flex-col p-2 w-full">
                                    <Button 
                                        name="Submit"
                                        type="submit"
                                        height="h-10"
                                        width="w-20"
                                        bgColor="bg-blue-500"
                                        textColor="text-white"
                                        fontSize="font-semibold"
                                    />
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/6 py-4 px-2">
                        <div className="bg-white rounded-lg p-2 flex flex-col px-4 py-4">
                            <CardCreateLoker idUser={userAuth} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}