"use client";

import { auth } from "@/firebase";
import { getUser } from "@/firebase/controllers/user.conroller";
import { onAuthStateChanged } from "firebase/auth";
import { redirect } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export default function AuthLayout({ children }) {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [allCategory, setAllCategory] = useState([]);
  const [allAct, setAllAct] = useState([]);
  const [pageLoad, setPageLoad] = useState(true);

  const value = {
    user,
    setUser,
    allCategory,
    setAllCategory,
    allAct,
    setAllAct,
    pageLoad,
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user.uid)
          .then((currentUser) => {
            setUser(currentUser);
            setPageLoad(false);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        setUser(null);
        router.push("/");
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
