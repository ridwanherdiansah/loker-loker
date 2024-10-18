import React from "react";
import IconClose from "@/component/icon/close";
const Modal = ({ isVisible, onClose, children, Judul }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ">
      <div className="w-[900px]">
        <div className="bg-white p-2 rounded-lg flex flex-col">
          <div className="flex justify-between border-b py-2 px-2">
            <h1 className="text-[30px] font-semibold">{Judul}</h1>
            <div className="cursor-pointer" onClick={() => onClose()}>
              <IconClose height="40" width="40" fill="black" />
            </div>
          </div>
          <div className="mt-4 px-4 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
