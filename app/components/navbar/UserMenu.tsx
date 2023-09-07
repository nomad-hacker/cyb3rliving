"use client";

import "/.flow/config";

import { useCallback, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as fcl from "@onflow/fcl";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { useOnClickOutside } from "@/app/hooks/useOnCllickOutside";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null;
  user: any;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser, user }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const dropdownMenu = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useOnClickOutside(dropdownMenu, () => {
    setIsOpen(false);
  });

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
             
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Rent your home
        </div>
        <div className="relative" ref={dropdownMenu}>
          <div
            onClick={toggleOpen}
            className="
            p-4
            md:py-1
            md:px-2
            border-[1px] 
            border-neutral-200 
            flex 
            flex-row 
            items-center 
            gap-3 
             
            cursor-pointer 
            hover:shadow-md 
            transition
            "
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar src={currentUser?.image} />
            </div>
          </div>
          {isOpen && (
            <div
              className="
              absolute 
               
              shadow-md
              bg-white 
              overflow-hidden 
              right-0 
              top-12 
              text-sm
            "
            >
              <div className="flex flex-col cursor-pointer">
                {currentUser ? (
                  <>
                    <MenuItem
                      label="My trips"
                      onClick={() => router.push("/trips")}
                    />
                    <MenuItem
                      label="My favorites"
                      onClick={() => router.push("/favorites")}
                    />
                    <MenuItem
                      label="My reservations"
                      onClick={() => router.push("/reservations")}
                    />
                    <MenuItem
                      label="My properties"
                      onClick={() => router.push("/properties")}
                    />
                    <MenuItem
                      label="Rent your home"
                      onClick={rentModal.onOpen}
                    />
                    <hr />
                    <MenuItem label="Logout" onClick={() => signOut()} />
                  </>
                ) : (
                  <>
                    <MenuItem
                      label="Login"
                      onClick={loginModal.onOpen} //{fcl.logIn} //
                    />
                    <MenuItem label="Sign up" onClick={registerModal.onOpen} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
