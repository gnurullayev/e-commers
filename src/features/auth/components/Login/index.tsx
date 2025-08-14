import React, { FC } from "react";
import { Button, Form, Input } from "antd";
import styles from "@/features/auth/SignIn.module.css";
import { routes } from "@/constants/routes";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";

interface IProps {
  loading: boolean;
  getData: (a: any) => void;
}

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email kiriting" })
    .regex(new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}"), {
      message: "Email mos kelmadi",
    }),
  password: z.string().min(1, { message: "Parollni kiriting" }),
});

const Login: FC<IProps> = ({ loading, getData }) => {
  const t = useTranslations("Auth");
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: any) => {
    getData(data);
  };
  return (
    <section className="auth_login">
      <div className="container">
        <div className={styles.auth_login__inner}>
          <div className={styles.form_container}>
            <Form
              name="wrap"
              labelCol={{ flex: "110px" }}
              labelAlign="left"
              labelWrap
              wrapperCol={{ flex: 1 }}
              colon={false}
              onFinish={handleSubmit(handleFormSubmit)}
            >
              <h3 className={styles.auth_login__title}>{t("login")}</h3>
              <span className={styles.auth_login__text}>{t("enter-data")}</span>
              <FormItem
                name="email"
                control={control}
                className={styles.form_item}
              >
                <Input
                  type="text"
                  placeholder={t("enter-email")}
                  className={styles.auth_input}
                />
              </FormItem>

              <FormItem
                name="password"
                control={control}
                className={styles.form_item_end}
              >
                <Input.Password
                  placeholder={t("enter-password")}
                  className={`${styles.auth_input} ${styles.auth_input_password}`}
                />
              </FormItem>

              <Button
                type="primary"
                className={styles.auth_login__btn}
                htmlType="submit"
                loading={loading}
              >
                {t("login")}
              </Button>
            </Form>

            <p className={styles.auth_signup_text}>
              <span>{t("new-account")}</span>
              <Link href={routes.SIGN_UP} className={styles.auth_signup}>
                {t("sign-up")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
