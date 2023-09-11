import "../.flow/config";

import { Nunito } from "next/font/google";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";

import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import SearchModal from "@/app/components/modals/SearchModal";
import RentModal from "@/app/components/modals/RentModal";

import ToasterProvider from "@/app/providers/ToasterProvider";

import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";

import Wagmi from "./components/web3/wagmi";

export const metadata = {
  title: "Flowairb",
  description: "A Web3 Rental Platform",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  let user: any;
  // const [user, setUser] = useState({ loggedIn: null, addr: null });
  // useEffect(() => fcl.currentUser.subscribe(setUser) as any, []);

  return (
    <html lang="en">
      <body className={`bg-primary-light ${font.className}`}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} user={user} />
        </ClientOnly>
        <Wagmi />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
