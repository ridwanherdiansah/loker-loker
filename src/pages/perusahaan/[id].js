import PerusahaanNetwork from "@/network/PerusahaanNetwork";
import UserNetwork from "@/network/UserNetwork";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import HeaderProfile from "@/component/layout/header/headerProfile";
import Button from "@/component/button";
import CardUpdatePerusahaan from "@/component/card/CardPerusahaan/cardUpdatePerusahaan";
import swal from "sweetalert";
export default function index(){
    const router = useRouter();
    const { id } = router.query;
    const formRef = useRef();
    const [cover, setCover] = useState("");
    const [errors, setErrors] = useState({});

    const [perusahaan, sertPerusahaan] = useState([]);
    const fetchPerusahaan = async (id) => {
        try {
            const response = await PerusahaanNetwork.user(id);
            sertPerusahaan(response.data);
        } catch (error) {
            console.error('error perusahaan get user', error);
        }
    }

    const [user, setUser] = useState([]);
    const fetchUser = async (id) => {
        try {
            const response = await UserNetwork.show(id);
            setUser(response.data);
        } catch (error) {
            console.log('user error id', error);
        }
    }

    useEffect(() => {
        if (id) {
            fetchPerusahaan(id);
            fetchUser(id);
        }
    }, [id]);

    const validateInputs = () => {
        const newErrors = {};
        if (!cover) {
            newErrors.cover = "Input foto tidak boleh kosong"
        }
        return newErrors;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validateInputs();
        if (Object.keys(newErrors == 0)) {
            const data = {
                id: id,
                cover: cover,
            }
            
            try {
                const response = await PerusahaanNetwork.updateFoto(data);
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

            } catch (error) {
                console.error(error);
            }
        } else {
            setErrors(newErrors);
        }

    }
    console.log(perusahaan.result);
    return(
        <>
            <div className="bg-slate-100">
            <HeaderProfile user={user} />
            <div className="flex px-24 py-4">
                <div className="w-2/6 py-4 px-2">
                    <div className="bg-white rounded-lg p-2 flex flex-col space-y-2 px-4">
                        <div className="flex flex-col space-y-4 items-center justify-center border-b py-8">
                            { perusahaan.code == 200 ? (
                                <>
                                    {
                                        perusahaan.result.cover ? (
                                            <img
                                                className=""
                                                height="250px"
                                                width="250px"
                                                src={perusahaan.result.cover}
                                                alt="perusahaan Cover"
                                            />
                                        ) : (
                                            <img
                                                className=""
                                                height="250px"
                                                width="250px"
                                                src="https://via.placeholder.com/640x480.png/00cc55?text=animals+ipsam"
                                                alt="Placeholder Image"
                                            />
                                        )
                                    }

                                </>
                            ) : (
                                <img
                                className=""
                                height="250px"
                                width="250px"
                                src="https://via.placeholder.com/640x480.png/00cc55?text=animals+ipsam"
                                alt="perusahaan Cover"
                            />
                            )}
                            
                            <form
                                className="flex"
                                ref={formRef}
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                            >
                                <input
                                    onChange={(e) => setCover(e.target.files[0])}
                                    name="file" 
                                    type="file" 
                                    className="border mx-2" 
                                />
                                <Button name="Update"  
                                    height="h-8"
                                    width="w-20"
                                    bgColor="bg-blue-500"
                                    textColor="text-white"
                                    fontSize="font-semibold"
                                    type="submit"
                                />
                            </form>
                        </div>
                        <div className="flex flex-col items-center border-b py-4">
                            <h1 className="font-semibold text-slate-800 text-lg">{user.name}</h1>
                            <h2 className="text-slate-500 text-sm">{user.bio}</h2>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-slate-500">
                                Terkirim
                            </label>
                            <h1 className="text-lg font-bold">2</h1>
                            </div>
                            <div className="flex items-center justify-center">
                            <Button
                                name="Lihat"
                                height="h-8"
                                width="w-24"
                                bgColor="bg-blue-500"
                                textColor="text-white"
                                fontSize="font-semibold"
                            />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-4/6 py-4 px-2 flex flex-col space-y-4">
                    <div className="rounded-lg bg-white p-4">
                        <CardUpdatePerusahaan perusahaan={perusahaan.result} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}