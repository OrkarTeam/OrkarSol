import Image from "next/image";
import clsx from "clsx";

import heroimage from "@/app/assets/images/heroimage.svg";

export const Button = ({ backgroundColor, className, children, ...restProps }) => {
  return (
    <button
      className={clsx([
        "py-2 px-4 font-[20px] text-white rounded-[10px] cursor-pointer",
        backgroundColor,
        className,
      ])}
      {...restProps}
    >
      {children}
    </button>
  );
};


export default function Home() {
  return (
    <div className="mt-[80px] flex justify-center">
      <div>
        <Hero />
        <TrendingCollections />
      </div>
    </div>
  );
}

const Hero = () => {
  return(
    <>
      <div className="flex items-center gap-[220px] mb-[114.99px] px-[2.5rem]">
        <div id="header">
          <div className="mb-[50px]">
            <h1 className="text-[65px] leading-[123%]">Buy and Sell</h1>
            <h1 className="text-[65px] leading-[123%]">
              Unique <span className="text-[#C9C5E0]">Digital Assets</span>
            </h1>
          </div>
          <div className="mb-[60px]">
            <p className="text-[#E3E3E3] font-[300] text-[20px] leading-[27px]">
              Join the NFT revolution and become a hero of the digital world!
              Orkar
            </p>
            <p className="text-[#E3E3E3] font-[300] text-[20px] leading-[27px]">
              marketplace offers unique and rare NFTs from talented creators
              around
            </p>
            <p className="text-[#E3E3E3] font-[300] text-[20px] leading-[27px]">
              the globe.
            </p>
          </div>
          <div className="flex items-center gap-[15px]">
            <Button backgroundColor="bg-[#897fd8] h-[55px] w-[243px]">
              Connect Wallet
            </Button>
            <Button backgroundColor="bg-[#242424] h-[55px] w-[243px]">
              Explore
            </Button>
          </div>
        </div>
        <div className="">
          <Image src={heroimage} alt="$orkar" />
        </div>
      </div>
    </>
  );
};

const TrendingCollections = () => {
  return(
    <>
      <div className="px-[2.5rem]">
        <div>
          <h2>Trending Collections</h2>
        </div>
        <div></div>
      </div>
    </>
  );
};