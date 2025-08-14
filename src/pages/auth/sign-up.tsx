import Authlayout from "@/features/auth/components/AuthLayout";
import React from "react";
import { CreatePasswordForm } from "@/features/auth";
import { API } from "@/services/api";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

export interface IGetPaswwordData {
  password: string;
  username: string;
  email: string;
}

const SignUp = () => {
  const t = useTranslations("Auth");
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => API.postSignUp(data),
    onSuccess: (response) => {
      message.success("successful");
      router.push("/");
    },
    onError: (error: any) => {
      if (error?.response?.data.message) {
        if (
          error?.response?.data.message === "The email has already been taken"
        ) {
          message.error("Bu elektron pochta alaqachon ro'yhatdan o'tgan.");
        } else {
          message.error(error?.response?.data.message);
        }
      } else {
        message.error(error.message);
      }
    },
  });

  const getData = async ({ password, username, email }: IGetPaswwordData) => {
    const url = window.location.origin;
    mutate({
      email,
      password,
      username,
      url,
    });
  };

  return (
    <Authlayout>
      <section className="auth_login">
        <div className="container">
          <CreatePasswordForm
            text={t("create-account")}
            title={t("sign-up")}
            btnText={t("login")}
            passwordPlaceholder={t("password")}
            getData={getData}
            loading={isPending}
          />
        </div>
      </section>
    </Authlayout>
  );
};

export default SignUp;
