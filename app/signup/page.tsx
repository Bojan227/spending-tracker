"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Link from "next/link";
import useCreateUser from "@/hooks/useCreateUser";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser, isLoading } = useCreateUser();
  const [error, setError] = useState("");

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        await createUser({
          documentId: user.uid,
          accounts: [],
        });

        router.push("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setError(errorMessage);
      });
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="email-address">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <button type="submit" onClick={onSubmit}>
          Sign up
        </button>
      </form>

      <Link href="/login">Already have an account? Sign in</Link>
      {error && <h1>{error}</h1>}
    </div>
  );
};

export default Signup;
