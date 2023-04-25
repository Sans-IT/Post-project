import Content from "@/pages/Content";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import Login from "../components/Login";

export default function Home() {
  const user = useUser();

  return (
    <>
      {user ? (
        <div className="pt-20 container mx-auto">
          <Content />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
