'use client'
import { useWeb3Modal } from '@web3modal/react'

export default function ConnectButton() {
    const { open, close } = useWeb3Modal()

  return (
    <button className="hidden lg:flex justify-end text-xl font-semibold py-4 px-6 lg:px-12 navbutton text-white"
            onClick={() => open()}>
    Connect Wallet
  </button>
  )
}