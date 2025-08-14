import React, { useState } from "react";
import { message } from "antd";
import { useRouter } from "next/router";
import Authlayout from "@/features/auth/components/AuthLayout";
import { signIn } from "next-auth/react";
import { Login } from "@/features/auth";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getData = async (data: any) => {
    setLoading(true);
    const respons = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((res) => res)
      .finally(() => {
        setLoading(false);
      });

    if (respons?.status === 200 && respons?.error === null) {
      message.success("successful");
      router.push("/");
      window.location.reload();
    } else {
      if (respons?.error === "Invalid login or password") {
        message.error("Login yoki parol hato");
      } else {
        message.error(
          "Xatolik yuz berdi mutaxasisga murojat qiling. " +
            "Xatolik mazmuni: " +
            respons?.error
        );
      }
    }
  };

  return (
    <Authlayout>
      <Login getData={getData} loading={loading} />
    </Authlayout>
  );
};

export default SignIn;
