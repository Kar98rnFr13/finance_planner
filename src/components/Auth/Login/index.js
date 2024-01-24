"use client";

import "../styles.css";
import { loginUser } from "@/firebase/controllers/user.conroller";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const formRef = useRef(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const pass = e.target.pass.value;

      const user = await loginUser({ email, pass });

      if (user instanceof Error) {
        console.log(user.message);
      } else {
        // formRef.current.reset();

        router.push("/guest/user/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form-con">
      <form onSubmit={(e) => handleLogin(e)} ref={formRef}>
        <div className="form-fields">
          <label htmlFor="email">Email </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="form-fields">
          <label htmlFor="pass">Password </label>
          <input type="text" name="pass" id="pass" placeholder="*****" />
        </div>
        <div className="form-fields">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
