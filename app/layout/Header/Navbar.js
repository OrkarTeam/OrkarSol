"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

import "@/app/assets/css/Navbar.css";
import orkarlogo from "@/app/assets/images/orkarlogo.svg";
import searchicon from "@/app/assets/images/searchicon.svg";
import WalletConnect from "@/app/components/walletconnect/WalletConnect";
import routes from "@/app/config/routes.js";
import WalletModal from "@/app/components/ui/walletmodal/Walletmodal";
import { walletDetails } from "@/app/data/static/wallets-details";

// Blockchain import
import {
  useConnectionStatus,
  useMetamask,
  useCoinbaseWallet,
  useWalletConnect,
  useAddress,
} from "@thirdweb-dev/react";

const Navbar = ({ wallet }) => {
  // Connect wallet functions
  const connectMetamask = useMetamask();
  const connectWalletConnect = useWalletConnect();
  const connectWithCoinbase = useCoinbaseWallet();

  const connectionStatus = useConnectionStatus();
  console.log("connectionStatus", connectionStatus);

  // To fetch user address
  const address = useAddress();
  console.log("address connected", address);

  // To fetch user balances 
  const [userBalance, setUserBalance] = useState()

  // Wallet modal
  const [walletModal, setWalletModal] = useState(false);

  // Function to handle button click and show the modal
  const handleButtonClick = () => {
    setWalletModal(true);
  };

  // Function to handle modal close and hide the modal
  const handleModalClose = () => {
    setWalletModal(false);
  };

  const handleMetamask = () => {
    try {
      connectMetamask();
    } catch (e) {
      // console.log("wallet connect error", e);
      alert(e)
    }
  };

  const handleWalletConnect = () => {
    connectWalletConnect();
  };

  const handleCoinbase = () => {
    connectWithCoinbase();
  };

  // Fetch user balance function
  async function fetchUserBalance() {
    const res = await axios.get(`http://localhost:4000/nativeBalance`, {
      params: {
        address: address
      }
    });
    console.log("userBalance", res.data)
    setUserBalance(res.data)
  }

  console.log(userBalance)

  // useEffect for fetching user data
  useEffect(() => {
    if (address) {
      fetchUserBalance()
    }
  }, [address])

  return (
    <div
      className={clsx([
        "scene__one",
        "scene__two",
        "h-32",
        "flex",
        "justify-center",
        "items-center",
      ])}>
      <div className="flex gap-[70px] items-center">
        <Link href={routes.home}>
          <div>
            <Image src={orkarlogo} width="130" height="49" alt="Orkar Logo" />
          </div>
        </Link>
        <div>
          <div
            className={clsx([
              "frame",
              "w-[679px]",
              "h-11",
              "cursor-pointer",
              "flex",
              "items-center",
              "px-[20.88px]",
              "gap-[10.87px]",
            ])}>
            <div>
              <Image src={searchicon} width="12" height="12" alt="searchIcon" />
            </div>
            <div>
              <input
                type="text"
                className="w-[610px] bg-transparent outline-none placeholder:text-[#E3E3E3] placeholder:font-[400] text-[13px] leading-[18px] placeholder:text-[13px] placeholder:leading-[18px]"
                placeholder="Search for items and collections"
              />
            </div>
          </div>
        </div>
        <div>
          <ul className="flex items-center gap-10">
            <Link href={routes.collection}>
              <li className="text-white font-[400] text-[14px] cursor-pointer leading-[19px]">
                Collection
              </li>
            </Link>
            <Link href={routes.rewards}>
              <li className="text-white font-[400] text-[14px] cursor-pointer leading-[19px]">
                Rewards
              </li>
            </Link>
            <Link href={routes.auction}>
              <li className="text-white font-[400] text-[14px] cursor-pointer leading-[19px]">
                Auction
              </li>
            </Link>
          </ul>
        </div>
        <div>
          {connectionStatus === "disconnected" ? (
            <WalletConnect onOpen={handleButtonClick} />
          ) : connectionStatus === "connected" ? (
            <>
              Address{" "}
              {/* {`${address.slice(0,6)}...${address.slice(address.length - 4)}`} */}
              {/* doesnt load on first reload */}
              {address}
              {}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {walletModal && ( // Render the modal only if showModal is true
        <WalletModal onClose={handleModalClose}>
          <div className="pb-[76.48px]">
            <h2 className="Satoshil font-[550] text-[28.02px] leading-[38px] text-white pb-[18.04px]">
              Connect Wallet
            </h2>
            <p className="text-[#C2C2C2] font-[400] text-[22.4176px] leading-[30px]">
              If you don't have a wallet yet, you can select a provider and
              create one now.
            </p>
          </div>
          <div>
            {walletDetails.map((wallet, index) => (
              <Item
                key={index}
                data={wallet}
                onClick={() => {
                  if (index === 0) {
                    handleMetamask();
                  } else if (index === 2) {
                    handleWalletConnect();
                  } else if (index === 3) {
                    handleCoinbase();
                  }
                }}
              />
            ))}
          </div>
        </WalletModal>
      )}
    </div>
  );
};

export default Navbar;

const Item = ({ data, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx([
        "item px-[28.02px] py-[22.42px] flex justify-between items-center cursor-pointer mt-4 mb-4 hover:bg-[#1F1F1F] transition-all duration-500",
      ])}>
      <div className="flex items-center gap-4">
        <div>
          <Image src={data.logo} width="" height="" alt="" />
        </div>
        <div className="capitalize">{data.name}</div>
      </div>
      <div>
        <Image src={data.end} width="" height="" alt="" />
      </div>
    </div>
  );
};
