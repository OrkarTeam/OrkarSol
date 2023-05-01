"use client"
import "./globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum, Polygon } from "@thirdweb-dev/chains";
import { Metadata } from 'next';

import Navbar from "app/layout/Header/Navbar.js";

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="satoshi">
        {/* <ErrorBoundary> */}
          <ThirdwebProvider
            activeChain={Ethereum}
            supportedChains={[Ethereum, Polygon]}>
            <Navbar />
            {children}
          </ThirdwebProvider>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
