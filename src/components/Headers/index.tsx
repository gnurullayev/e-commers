import React from "react";
import Header from "./Header";
import { useRouter } from "next/router";
import PublicHeader from "./PublicHeader";
import { AUTH_PATH } from "@/constants";
const chackPath = (router: any, path: string) => router.pathname.includes(path);
const Headers = () => {
  const router = useRouter();

  return !chackPath(router, AUTH_PATH) &&
    !chackPath(router, "create-profile") ? (
    <Header />
  ) : (
    <PublicHeader />
  );
};

export default Headers;
