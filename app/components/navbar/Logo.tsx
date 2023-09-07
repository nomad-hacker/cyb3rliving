"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      className="hidden lg:block cursor-pointer"
      src="/images/logo.png"
      height="200"
      width="200"
      alt="Logo"
    />
  );
};

export default Logo;
