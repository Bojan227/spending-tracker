"use client";

import "./nav.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FaDollarSign, FaStickyNote, FaBoxes, FaUsers } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, switchUser } = useUserStore();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/login");
        switchUser(undefined);
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return currentUser ? (
    <nav>
      <ul className="main-navigation">
        <li>
          <Flex direction="column" align="center">
            <Icon as={FaDollarSign} w={8} h={8} />
            <Link className={pathname === "/" ? "active" : ""} href="/">
              Spending
            </Link>
          </Flex>
        </li>
        <li>
          <Flex direction="column" align="center">
            <Icon as={FaStickyNote} w={8} h={8} />
            <Link
              className={pathname === "transactions" ? "active" : ""}
              href="/transactions"
            >
              Transactions
            </Link>
          </Flex>
        </li>
        <li>
          <Flex direction="column" align="center">
            <Icon as={FaBoxes} w={8} h={8} />
            <Link
              className={pathname === "/categories" ? "active" : ""}
              href="/categories"
            >
              Categories
            </Link>
          </Flex>
        </li>
        <li>
          <Flex direction="column" align="center">
            <Icon as={FaUsers} w={8} h={8} />
            <Link
              className={pathname === "/accounts" ? "active" : ""}
              href="/accounts"
            >
              Accounts
            </Link>
          </Flex>
        </li>
      </ul>
      <Icon
        onClick={handleLogout}
        cursor="pointer"
        as={FaArrowRight}
        w={8}
        h={8}
        color="#f59e0b"
        marginRight={6}
      />
    </nav>
  ) : null;
}
