import React, { FC } from "react";
import { Button, Form, Input } from "antd";
import styles from "../../SignIn.module.css";
import { IGetPaswwordData } from "@/pages/auth/sign-up";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/router";
import { routes } from "@/constants/routes";
import { useTranslations } from "next-intl";

interface ICreatePassword {
  getData: (data: IGetPaswwordData) => void;
  title: string;
  text: string;
  btnText: string;
  passwordPlaceholder: string;
  loading: boolean;
}

const schema = z.object({
  password: z
    .string()
    .trim()
    .min(8, { message: "Parolni 8 ta simvoldan kam bo'lmasin" })
    .regex(new RegExp("^[a-zA-Z0-9]+$"), {
      message: "Parolni lotin alifbosida bo'lishi shart",
    })
    .regex(new RegExp("[A-Z]"), {
      message: "Parolni eng kamida bitta katta harf bo'lishi shart",
    }),
  email: z.string().regex(new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}"), {
    message: "Email mos kelmadi",
  }),
  username: z.string().trim(),
});

const CreatePasswordForm: FC<ICreatePassword> = ({
  getData,
  title,
  text,
  btnText,
  passwordPlaceholder,
  loading,
}) => {
  const router = useRouter();
  const pathName = router.pathname;
  const t = useTranslations("Auth");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      username: "",
      email: "",
    },
    resolver: zodResolver(schema),
  });
  1;

  const handleFormSubmit = ({
    password,
    username,
    email,
  }: IGetPaswwordData) => {
    getData({ password, username, email });
  };

  return (
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
          <h3 className={styles.auth_login__title}>{title}</h3>
          <span className={styles.auth_login__text}>{text}</span>
          <FormItem
            control={control}
            name="email"
            style={{ marginBottom: "30px" }}
            className={styles.form_item}
          >
            <Input
              type="text"
              placeholder="E-mail"
              autoComplete="off"
              className={styles.auth_input}
            />
          </FormItem>

          <FormItem
            control={control}
            name="username"
            style={{ marginBottom: "30px" }}
            className={styles.form_item}
          >
            <Input
              type="text"
              placeholder="Username"
              autoComplete="off"
              className={styles.auth_input}
            />
          </FormItem>

          <FormItem
            label=""
            control={control}
            name="password"
            className={styles.form_item}
          >
            <Input.Password
              placeholder={passwordPlaceholder}
              className={`${styles.auth_input} ${styles.auth_input_password}`}
            />
          </FormItem>

          <ul className={styles.auth_text_list}>
            <li className={styles.auth_text_item}>{t("password-validate")}</li>

            <li className={styles.auth_text_item}>{t("one-big-latter")}</li>
          </ul>

          <Button
            type="primary"
            className={styles.auth_login__btn}
            htmlType="submit"
            style={{ marginTop: "0" }}
            disabled={pathName !== routes.SIGN_UP}
            loading={loading}
          >
            {btnText}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreatePasswordForm;
