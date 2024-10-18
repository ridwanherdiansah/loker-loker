import React from "react";

export default function Input({ height, width, type, onChange, error, value, disabled }) {
  return (
    <>
      <input
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e)}
        type={type}
        className={`border rounded-lg ${height} ${width} p-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:text-slate-800`}
      />
      <span className="text-[16px] text-red-500 ">{error}</span>
    </>
  );
}
