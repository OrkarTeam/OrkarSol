"use client";
import { useEffect, useRef } from "react";

const WalletModal = ({ onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      const modal = modalRef.current;

      // Close the modal if the clicked element is not a child of the modal
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
      className="bg-[#151515] px-[56.04px] py-[97.14px] h-[700px] w-[1020px] absolute top-[12px] modal transition-all duration-500"
    >
      {/* <button onClick={onClose}>X</button> */}
      {children}
    </div>
  );
};

export default WalletModal;
