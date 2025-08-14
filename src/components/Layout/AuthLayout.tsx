import React, { ReactNode, useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loading from "../Loading";
import { routes } from "@/constants/routes";

interface IAuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  const { data, status } = useSession();
  const router = useRouter();
  const pathName = router.pathname;

  if (status === "loading") return <Loading />;

  if (status === "authenticated") {
    if (data.user.name) {
      if (pathName.includes("/auth") || pathName.includes(routes.SIGN_UP))
        router.push(routes.HOME);
      else return children;
    } else {
      if (!pathName.includes(routes.SIGN_UP)) router.push(routes.SIGN_UP);
      else return children;
    }
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthLayout;
