"use client";

import { useRouter } from "next/navigation";

import "./styles.css";

export default function Landing() {
  const router = useRouter();

  return (
    <>
      <div className="landing">
        <button onClick={() => router.push("/guest/auth/login")}>Login</button>
        <button onClick={() => router.push("/guest/auth/sign-up")}>
          Sign Up
        </button>
      </div>
    </>
  );
}
