"use client";
import Dashboard from "@/components/Dashboard";
import { redirect } from "next/navigation";
import { useContext, useLayoutEffect } from "react";
import { AuthContext } from "./layout";

export default function DashboardPage() {
  const { user, pageLoad } = useContext(AuthContext);

  useLayoutEffect(() => {
    if (!pageLoad) {
      if (!user.full_name) {
        redirect("/");
      } else {
        console.log(user);
      }
    }
  }, [user]);

  return <Dashboard />;
}
