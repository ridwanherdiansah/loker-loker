import React, { useEffect, useState } from "react";
import HeaderProfile from "@/component/layout/header/headerProfile";
import Carduser from "@/component/card/CardUser";
import { useRouter } from "next/router";
import UserNetwork from "@/network/UserNetwork";
import LokerNetwork from "@/network/LokerNetwork";
import Button from "@/component/button";
import PelamarNetwork from "@/network/PelamarNetwork";
import swal from "sweetalert";
export default function id(){
    const router = useRouter();
    const {id} = router.query;

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

    const [loker, setLoker]= useState([]);
    const fetchLoker = async (id) => {
        try {
            const response = await LokerNetwork.show(id);
            setLoker(response.data);
        } catch (error) {
            console.error('error loker pekerjaan', error);
        }
    }

    useEffect(() => {
        const userSession = JSON.parse(sessionStorage.getItem('userAuth'));
        setUserAuth(userSession);
    }, []);

    useEffect(() => {
        if (id && userAuth) {
          fetchUser(userAuth)
          fetchLoker(id);
        }
      }, [id, userAuth]);

      const onsubmit = async (event) => {
        event.preventDefault();
        try {
          const data = {
            id_loker: id,
            id_user: userAuth
          }
    
          const response = await PelamarNetwork.create(data);
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
          console.error('erro apply', error);
        }
    
    }

    return(
        <div className="bg-slate-100">
            <HeaderProfile user={user} />
            <div className="flex px-24 py-4">
                <div className="w-2/6 py-4 px-2">
                    <Carduser user={user} />
                </div>
                <div className="w-4/6 py-4 px-2">
                    <div className="bg-white rounded-lg p-2 flex flex-col space-y-2 px-4 mb-4">
                        <div className="flex items-center">
                            <img
                                height="50px"
                                width="50px"
                                src={loker.cover}
                                alt={loker.nameLoker}
                            />
                            <div className="flex flex-col mx-4">
                                <h1 className="font-semibold text-sm text-black">{loker.nameLoker}</h1>
                                <h2 className="text-xs text-slate-500">{loker.namePerusahaan}</h2>
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={loker.deskripsi ? { __html: loker.deskripsi } : { __html: '' }}></div>
                        <div className="flex space-x-3 border-t pt-4">
                            <Button
                                onClick={onsubmit}
                                name="Apply"
                                height="h-10"
                                width="w-24"
                                bgColor="bg-blue-500"
                                textColor="text-white"
                                fontSize="font-bold"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}