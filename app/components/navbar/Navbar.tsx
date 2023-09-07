import { SafeUser } from "@/app/types";

import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, user }) => {
  return (
    <div className="fixed w-full bg-primary-light z-10">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} user={user} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
