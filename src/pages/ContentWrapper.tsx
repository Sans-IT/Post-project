import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import Login from "../components/Login";
import Content from "@/components/Content";

export default function ContentWrapper() {
  const user = useUser();
  return (
    <div className="pt-20 container mx-auto">
      {user ? <Content /> : <Login />}
    </div>
  );
}
