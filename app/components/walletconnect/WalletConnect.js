import Image from "next/image";

import wallet from "@/app/assets/images/wallet.svg";

const WalletConnect = ({ onOpen }) => {
  return (
    <div
      onClick={onOpen}
      className="bg-[#6A62AB] w-[68px] h-[42px] rounded-[10px] flex justify-center items-center"
    >
      <Image src={wallet} width="" height="" alt="" />
    </div>
  );
};

export default WalletConnect;
