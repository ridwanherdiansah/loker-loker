import React, { useEffect, useRef, useState } from "react";
import Input from "@/component/form/input";
import Textarea from "@/component/form/textarea";
import Button from "@/component/button";
import PerusahaanNetwork from "@/network/PerusahaanNetwork";
import { useRouter } from "next/router";
export default function CardUpdatePerusahaan({ perusahaan }){
    const router = useRouter();
    const { id } = router.query;

    const formRef = useRef();

    const [error, setError] = useState([]);
    const [namePerusahaan, setNamePerusahaan] = useState("");
    const [email , setEmail] = useState("");
    const [bio , setBio] = useState("");
    const [website, setWebsite] = useState("");
    const [alamat , setAlamat] = useState("");
    const [telepon , setTelepon] = useState("");
    const [tahunBerdiri, setTahunBerdiri] = useState("");
    
    const validateInput = () => {
        const validasiErrors = {};

        if (!namePerusahaan.trim()) {
            validasiErrors.namePerusahaan = "name harus di isi";
        } else if (namePerusahaan.length > 20) {
        validasiErrors.namePerusahaan = "name tidak boleh lebih dari 20 karakter";
        }
        if (!email.trim()) {
            validasiErrors.email = "Email harus diisi";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validasiErrors.email = "Email tidak valid";
        } else if (email.length > 20) {
            validasiErrors.email = "name tidak boleh lebih dari 20 karakter";
        }
        if (!website.trim()) {
            validasiErrors.website = "website harus di isi";
        }
        if (!alamat.trim()) {
            validasiErrors.alamat = "alamat harus di isi";
        } else if (alamat.length > 50) {
        validasiErrors.alamat = "alamat tidak boleh lebih dari 50 karakter";
        }
        if (!telepon.trim()) {
            validasiErrors.telepon = "telepon harus di isi";
        } else if (telepon.length > 20) {
            validasiErrors.telepon = "telepon tidak boleh lebih dari 20 karakter";
        } else if (!/^\d+$/.test(telepon)) {
            newErrors.telepon = "Telepon harus terdiri dari angka";
        }
        if (!bio.trim()) {
            validasiErrors.bio = "bio harus di isi";
        } else if (bio.length > 200) {
            validasiErrors.bio = "bio tidak boleh dari 200 karakter";
        } 
        if (!tahunBerdiri) {
          validasiErrors.tahunBerdiri = "Tahun berdiri harus di isi";
        }

        return validasiErrors;
    };

    const formSubmit = async (event) => {
        event.preventDefault();
        const validasiErrors = validateInput();
        if (Object.keys(validasiErrors).length === 0) {
            const updatePerusahaan = {
                idUser: id,
                name: namePerusahaan,
                email: email,
                bio: bio,
                website: website,
                alamat: alamat,
                telepon: telepon,
                tahunBerdiri: tahunBerdiri,
            };
              const response = await PerusahaanNetwork.CardUpdatePerusahaan(updatePerusahaan);
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
    
    useEffect(() => {
        if (perusahaan) {
            setNamePerusahaan(perusahaan.name_perusahaan)
            setEmail(perusahaan.email)
            setBio(perusahaan.bio)
            setAlamat(perusahaan.alamat)
            setTelepon(perusahaan.telepon)
            setWebsite(perusahaan.website)
            setTahunBerdiri(perusahaan.tahun_berdiri)
        }
    }, [perusahaan])

    return(
        <>
            <h1 className="font-semibold text-slate-800 text-lg">Profile</h1>
            <div>
                <form ref={formRef} onSubmit={formSubmit} encType="multipart/form-data">
                    <div className="flex justify-between">
                        <div className="flex flex-col p-2 w-full">
                            <label className="text-base text-slate-800">Name Perusaahan</label>
                            <Input 
                                height="h-10" 
                                width="w-full" 
                                value={namePerusahaan}
                                onChange={(e) => {
                                    setNamePerusahaan(e.target.value);
                                  }}
                                error={error.namePerusahaan}
                            />
                        </div>
                        <div className="flex flex-col p-2 w-full">
                            <label className="text-base text-slate-800">Email</label>
                            <Input 
                                height="h-10" 
                                width="w-full"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                  }}
                                error={error.email}
                           />
                        </div>
                    </div>
                    <div className="flex flex-col p-2 w-full">
                        <label className="text-base text-slate-800">Bio</label>
                        <Textarea
                            name="bio"
                            label="Berdoa di donasi ini (opsional)"
                            value={bio}
                            placeholder="Tuliskan BIO dari profile anda di sini"
                            maxLength="200"
                            onChange={(e) => {
                                setBio(e.target.value)
                            }}
                            error={error.bio}
                        />
                    </div>
                    <div className="flex flex-col p-2 w-full">
                        <label className="text-base text-slate-800">Alamat</label>
                        <Input 
                            height="h-10" 
                            width="w-full" 
                            value={alamat}
                            onChange={(e) => {
                                setAlamat(e.target.value);
                            }}
                            error={error.alamat}
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col p-2 w-full">
                            <label className="text-base text-slate-800">Telepon</label>
                            <Input 
                                height="h-10" 
                                width="w-full" 
                                value={telepon}
                                onChange={(e) => {
                                    setTelepon(e.target.value);
                                }}
                                error={error.telepon}
                            />
                        </div>
                        <div className="flex flex-col p-2 w-full">
                            <label className="text-base text-slate-800">Website</label>
                            <Input 
                                height="h-10" 
                                width="w-full" 
                                value={website}
                                onChange={(e)=> {
                                        setWebsite(e.target.value);
                                }}
                                error={error.website}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col p-2 w-full">
                        <label className="text-base text-slate-800">Tahun Berdiri</label>
                        <Input 
                              type="date"
                              height="h-10" 
                              width="w-full" 
                              value={tahunBerdiri}
                              onChange={(e)=> {
                                      setTahunBerdiri(e.target.value);
                              }}
                              error={error.tahunBerdiri}
                          />
                    </div>
                    <div className="flex flex-col p-2 w-full">
                        <Button
                            name="Submit"
                            height="h-10"
                            width="w-24"
                            bgColor="bg-blue-500"
                            textColor="text-white"
                            fontSize="font-semibold"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}