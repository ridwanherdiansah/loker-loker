import React, { useEffect, useState } from "react";
import CardPerusahaan from "@/component/card/CardPerusahaan";
import CardLoker from "@/component/card/CardLoker";
import Header from "@/component/layout/header";
import LokerNetwork from "@/network/LokerNetwork";
import Button from "@/component/button";
import Image from "@/component/image";
export default function index() {
  
  const [searchResults, setSearchResults] = useState([])
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      search: event.target.search.value,
    }

    const showSearchResults = async (data) => {
      try {
        const response = await LokerNetwork.search(data);
        setSearchResults(response.data);
      } catch (error) {
        console.error('debug', error);
      }
      
    }
    
    await showSearchResults(data)
  }

  return (
    <>
      <div className="flex px-24 py-8">
        <div className="w-1/6 p-4">
        </div>
        <div className="w-full p-4">
        <div className="flex flex-col">
            <form onSubmit={handleSubmit}>
              <div className="border-b p-2 flex space-x-4 justify-end">
                <input type="text" name="search" placeholder="Search ..." className="border rounded-lg p-2 w-full" />
                <Button 
                  type="submit"
                  name="Search"
                  width="w-32"
                  height="h-10"
                  bgColor="bg-blue-500"
                  fontSize="font-bold"
                  textColor="text-white" />
              </div>
            </form>
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((data, key) => {
                return(
                  <div key={key}>
                      <CardPerusahaan
                          keahlian={data.name_loker}
                          perusahaan={data.name_perusahaan}
                          kota={data.alamat}
                          tanggal={data.created_at}
                          id={data.id}
                          src={data.cover}
                      />
                    </div>
                )
              })
            ) : (
              <div className="w-full flex flex-col items-center my-32">
                <Image
                  src="/search.png"
                  width="400"
                  height="400"
                  className="rounded-lg"
                  alt=".."
                />
                <h1 className="font-semibold text-center text-purple">
                  Optimalkan Pencarian Anda dengan kata kunci yang terkait
                  untuk meningkatkan keterlihatan di hasil pencarian !!!
                </h1>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/6 p-4">
        </div>
      </div>
    </>
  );
}
