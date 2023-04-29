"use client";
import { useEffect, useRef } from "react";

const WalletModal = ({ onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      const modal = modalRef.current;
      if (modal && !modal.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  const handleModalClick = () => {
    onClose();
  };

  return (
    <div
      onClick={handleModalClick}
      ref={modalRef}
      className="bg-[#151515] h-[767.8px] w-[1020px] absolute top-[30px] modal transition-all duration-500 px-[56px] py-[97.14px]"
    >
      {/* <button onClick={onClose}>X</button> */}
      {children}
    </div>
  );
};

export default WalletModal;
