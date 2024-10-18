import React from "react";
import Link from "next/link";
export default function Button({
  name,
  height,
  width,
  bgColor,
  textColor,
  fontSize,
  type,
  href,
  onClick,
}) {
  return typeof href === "undefined" ? (
      <button
        onClick={onClick}
        type={type}
        className={`border rounded-full p-2 ${width} ${height} ${fontSize} ${textColor} ${bgColor} hover:opacity-70 flex items-center justify-center`}
      >
        {name}
      </button>
  ):(
    <Link href={`${href}`} className={`${width} ${height}`}>
      <button
        type={type}
        className={`border rounded-full p-2 ${width} ${height} ${fontSize} ${textColor} ${bgColor} hover:opacity-70 flex items-center justify-center`}
      >
        {name}
      </button>
    </Link>
  );
}
