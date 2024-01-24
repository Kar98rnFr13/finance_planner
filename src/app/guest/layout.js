"use client";

import { auth } from "@/firebase";
import { getUser } from "@/firebase/controllers/user.conroller";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthLayout({ children }) {
  const [user, setUser] = useState({});
  const [allCategory, setAllCategory] = useState([]);
  const [allAct, setAllAct] = useState([]) 

  const value = {
    user,
    setUser,
    allCategory,
    setAllCategory,
    allAct,
    setAllAct
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user.uid)
          .then((currentUser) => {
            setUser(currentUser);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
