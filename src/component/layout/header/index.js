import React from "react";
import Image from "@/component/image";
import Link from "next/link";
import Search from "@/component/icon/search";
import Button from "@/component/button";
export default function Index() {
  return (
    <>
      <div className="px-24">
        <div className="flex justify-between items-center px-4">
          <Image
            width="250px"
            height="250px"
            src="../logss.png"
          />
          <div className="flex space-x-4">
            <Link href="/search">
              <Search width="40" height="40" fill="gray" />
            </Link>
            <Link href="auth">
              <Button
                name="Sign"
                width="w-32"
                height="h-10"
                bgColor="bg-blue-500"
                fontSize="font-bold"
                textColor="text-white"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
