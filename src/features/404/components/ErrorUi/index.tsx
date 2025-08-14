import React, { FC } from "react";
import notFound from "@/assets/icons/notFound.png";
import Image from "next/image";
import { Button } from "antd";
import styled from "./ErrorUi.module.css";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
interface IErrorPage {
  errorType:string,
  errorText:string,
  errorStatus?:any
}
export const ErrorUi:FC<IErrorPage> = ({errorType, errorStatus, errorText, }) => {
  const routes = useRouter();
  const navigateToHome = () => {
    routes.push("/");
  };
  const t = useTranslations("General")
  return (
    <>
      <Image className={styled.svg} src={notFound} alt="not found" />
      <div className={`${styled.inner} container`}>
        <h1 className={styled.preTitle}>{errorType}</h1>
        <h5 className={styled.title}>{errorStatus}</h5>
        <p className={styled.text}>
       {errorText}
        </p>
        <Button onClick={navigateToHome} className={styled.btn}>
      {t("retry")}
        </Button>
      </div>
    </>
  );
};
