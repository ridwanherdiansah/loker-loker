import React from "react";
import Button from "@/component/button";
import Image from "@/component/image";
import CardPerusahaan from "@/component/card/CardPerusahaan";
import CardLoker from "@/component/card/CardLoker";
import Search from "@/component/icon/search";
import Link from "next/link";
import Heade from "@/component/layout/header";
export default function index() {
  return (
    <>
      <Heade />
      <div className="flex border px-24 py-8">
        <div className="w-1/2 p-4">
          <div className="flex flex-col">
            <CardPerusahaan
              keahlian="Sr. Key Account Manager-Wholesale"
              perusahaan="King's Hawaiian"
              kota="Unted States"
              tanggal="20-10-2024"
              id=""
              src="https://media.licdn.com/dms/image/C560BAQF5nQfBWAcs2w/company-logo_100_100/0/1630629707161/kingshawaiian_logo?e=2147483647&v=beta&t=IztaY8uNTrKJTQdogTd96DrjHEwQqq34T6-SyIor34U"
            />
          </div>
        </div>
        <div className="w-1/2 p-4">
          <div className="scroll-smooth focus:scroll-auto">
            <CardLoker
              src="https://media.licdn.com/dms/image/C560BAQF5nQfBWAcs2w/company-logo_100_100/0/1630629707161/kingshawaiian_logo?e=2147483647&v=beta&t=IztaY8uNTrKJTQdogTd96DrjHEwQqq34T6-SyIor34U"
              keahlian="Sr. Key Account Manager-Wholesale"
              perusahaan="King's Hawaiian"
              kota="Unted States"
              tanggal="20-10-2024"
              id=""
              deskripsi="
            Joining King’s Hawaiian makes you part of our `ohana (family). We
            are a family-owned business for over seventy years, respecting our
            roots while thinking about our future as we continue to grow and
            care for our customers and the communities we serve. Our `ohana
            members build an environment of inclusivity as they freely
            collaborate, pursue learning through curiosity, and explore
            innovation as critical thinkers. Beyond that, we are also passionate
            about supporting the long-term health and well-being of our
            employees and their families. If you’re excited to rise with our
            team, come and join our `ohana! The Sr. Key Account Manager will be
            responsible for leading all sales and merchandising efforts across
            multiple IFG brands (King’s Hawaiian and Grillo’s Pickles) across
            the Wholesaler and Distributor business. This is a highly dynamic
            role within the IFG Sales organization, one that champions an
            ownership mindset, the ability to cultivate meaningful partnerships,
            and build irresistible experiences for our customers and consumers.
            "
            />
          </div>
        </div>
      </div>
    </>
  );
}
