import { useRouter } from "next/router";
import React, { useState, useEffect, useRef  } from "react";
import HeaderProfile from "@/component/layout/header/headerProfile";
import UserNetwork from "@/network/UserNetwork";
import Image from "next/image";
import Button from "@/component/button";
import CardUpdateProfile from "@/component/card/CardUser/CardUpdateProfile";
import CardPengalaman from "@/component/card/CardUser/CardPengalaman";
import CardPendidikan from "@/component/card/CardUser/CardPendidikan";
import IconTrash from "@/component/icon/trash";
import IconClose from "@/component/icon/close";
import IconPlus from "@/component/icon/plus";
import swal from "sweetalert";
import Modal from "@/component/modal/modal";
import CardKeahlian from "@/component/card/CardUser/CardKeahlian";
export default function index(){
    const formRef = useRef();
    const routes = useRouter();
    const { id } = routes.query;
    const [loading, setLoading] = useState(true);
    const [cover, setCover] = useState("");
    const [errors, setErrors] = useState({});

    const [user, setUser] = useState([]);
    const fetchUser = async(id) => {
        try {
        const response = await UserNetwork.show(id);
        setUser(response.data);
        } catch (error) {
        console.error('error user', error);
        }
    }

    const validateInputs = () => {
        const newErrors = {};
        if (!cover) {
            newErrors.cover = "Input foto tidak boleh kosong"
        }
        return newErrors;
    }
    
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const newErrors = validateInputs();
        if (Object.keys(newErrors == 0)) {
            const data = {
                id:id,
                cover: cover,
            }
            
            try {
                const response = await UserNetwork.updateFoto(data);
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
        
    };

    useEffect(() => {
        if (id) {
        fetchUser(id);
        }
    }, [id]);

    const onClick = () => {
        sessionStorage.removeItem('userAuth');
        swal({
            title: "Logout Successful",
            icon: "success",
        }).then(() => {
            window.location.href = "/";
        });
    }
    
    return(
        <div className="bg-slate-100">
            <HeaderProfile user={user} />
            <div className="flex px-24 py-4">
                <div className="w-2/6 py-4 px-2">
                    <div className="bg-white rounded-lg p-2 flex flex-col space-y-2 px-4">
                        <div className="flex flex-col space-y-4 items-center justify-center border-b py-8">
                            <img
                                className=""
                                height="250px"
                                width="250px"
                                src={user.cover}
                                alt="User Cover"
                            />
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
                            <div className="flex items-center justify-center">
                            <Button
                                onClick={onClick}
                                name="Logout"
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
                        <CardUpdateProfile user={user} />
                    </div>

                    <div className="rounded-lg bg-white p-4">
                        <CardPengalaman user={user} />
                    </div>

                    <div className="rounded-lg bg-white p-4">
                        <CardPendidikan user={user} />
                    </div>

                    <div className="rounded-lg bg-white p-4">
                        <CardKeahlian user={user} />
                    </div>

                    
                </div>
            </div>
        </div>
    )
}