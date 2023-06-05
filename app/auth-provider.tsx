"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { switchUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        switchUser(uid);
      } else {
        // User is signed out
        // ...
        router.push("/login");
        console.log("user is logged out");
      }
    });
  }, []);

  return <>{children}</>;
}
