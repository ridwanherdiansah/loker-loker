import React, { useEffect, useState } from "react";
import HeaderProfile from "@/component/layout/header/headerProfile";
import Carduser from "@/component/card/CardUser";
import CardPerusahaan from "@/component/card/CardUser/CardPerusahan";
import CardProfilePrusahaan from "@/component/card/CardPerusahaan/cardProfilePrusahaan";
import PerusahaanNetwork from "@/network/PerusahaanNetwork";
import UserNetwork from "@/network/UserNetwork";
export default function Index() {
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
  
  const [perusahaan, setPerusahaan] = useState([]);
  const fetchPerusahaan = async () => {
    try {
      const response = await PerusahaanNetwork.get();
      setPerusahaan(response.data);
    } catch (error) {
      console.error("error perusahan index", error);
    }
  }

  const [profileRusahaan, setProfilePrusahaan] = useState([]);
  const fetchProfilePrusahaan = async (userAuth) => {
    try {
      const response = await PerusahaanNetwork.user(userAuth);
      setProfilePrusahaan(response.data);
    } catch (error) {
      console.log('error profile prusahaan', error);
    }
  }

  console.log(profileRusahaan);

  useEffect(() => {
    const userSession = JSON.parse(sessionStorage.getItem('userAuth'));
    setUserAuth(userSession);
  }, []);

  useEffect(() => {
    if (userAuth) {
      fetchUser(userAuth);
      fetchProfilePrusahaan(userAuth);
    }
    fetchPerusahaan();
  }, [userAuth]);

  return (
    <div className="bg-slate-100">
      <HeaderProfile user={user} />
      <div className="flex px-24 py-4">
        <div className="w-2/6 py-4 px-2">
            <CardProfilePrusahaan idUser={userAuth} perusahaan={profileRusahaan} />
        </div>
        <div className="w-4/6 py-4 px-4">
          <CardPerusahaan perusahaan={perusahaan} />
        </div>
      </div>
    </div>
  );
}
