import React, { useEffect } from "react";
import Login from "../../components/Login";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

export default function LoginPage() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, []);

  return (
    <div className="pt-20 container mx-auto">
      <Login />
    </div>
  );
}
