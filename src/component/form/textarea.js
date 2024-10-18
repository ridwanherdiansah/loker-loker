import React from "react";

export default function Textarea({
  placeholder,
  value,
  error,
  onChange,
}){
  return(
    <>
    <div className="flex flex-col py-1 relative">
      <div className="relative">
        <textarea
          className="border rounded-md px-2 py-2 w-full border-gray text-base text-slate-900 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
          rows="4"
          placeholder={placeholder}
          value={value} 
          onChange={(e) => onChange(e)}
        />
      </div>
      <span className="text-xs text-rose-600">{error}</span>
    </div>
</>
  )
}
// import React, { useState } from "react";

// export default function Textarea({
//   label,
//   name,
//   placeholder,
//   value,
//   onChange,
//   error,
//   maxLength,
// }) {
//   const handleChange = (e) => {
//     const updatedValue = e.target.value;
//     onChange(updatedValue); // Memanggil fungsi onChange yang diberikan dari komponen induk
//   };

//   return (
//     <div className="flex flex-col py-1 relative">
//       <div className="relative">
//         <textarea
//           className="border rounded-md px-2 py-2 w-full border-gray text-base text-slate-900 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
//           rows="4"
//           maxLength={maxLength}
//           placeholder={placeholder}
//           value={value}
//           onChange={handleChange}
//         />
//         <span
//           id="charCount"
//           className="absolute right-2.5 bottom-2.5 text-xs leading-4 text-[#c6c6c6]"
//         >
//           {value.length} / {maxLength}
//         </span>
//       </div>
//       <span className="text-xs text-rose-600">{error}</span>
//     </div>
//   );
// }
