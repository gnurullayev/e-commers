import { MenuCloseIcon, MenuIcon, UserIcon } from "@/assets/icons";
import { Button, Drawer, Space } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./MobileDriwer.module.css";
import Link from "next/link";
import { language } from "@/constants";
import { routes } from "@/constants/routes";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

const windowHeight = () =>
  typeof window !== "undefined" ? window.innerHeight - 116 : 0;

const MobileDrawer = () => {
  const t = useTranslations();
  const { data } = useSession();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const userImage = data?.user?.picture ? data?.user?.picture : UserIcon;

  return (
    <>
      <Space>
        <Button className={styles.btn} type="default">
          {open ? (
            <Image
              src={MenuCloseIcon}
              alt="menu"
              width={24}
              height={16}
              onClick={onClose}
            />
          ) : (
            <Image
              src={MenuIcon}
              alt="menu"
              width={24}
              height={16}
              onClick={showDrawer}
            />
          )}
        </Button>
      </Space>

      <Drawer
        placement={"top"}
        width={500}
        onClose={onClose}
        open={open}
        closable={true}
        styles={{
          header: { display: "none" },
          mask: { backgroundColor: "transparent" },
          content: { height: windowHeight() + "px" },
        }}
        rootStyle={{ top: "68px" }}
      >
        <ul className={styles.lenguage_btn_list}>
          {language.map((el) => (
            <li
              className={styles.lenguage_btn_item}
              key={el.value}
              onClick={onClose}
            >
              <Link className={styles.lenguage_btn_link} href={el.value}>
                {el.label}
              </Link>
            </li>
          ))}
        </ul>

        {data ? (
          <Link href={"/"} className={styles.user}>
            <Image
              src={userImage}
              alt="icon"
              width={50}
              height={50}
              className={styles.user_image}
            />
            <div className={styles.content}>
              <p className={styles.content_title}>Shaxsiy kabinet</p>
              <span className={styles.content_text}>
                {data.user.last_name + " " + data.user.name}
              </span>
            </div>
          </Link>
        ) : (
          <div className={styles.login_box}>
            <Link href={routes.LOGIN} className={styles.login_btn}>
              {t("Auth.login")}
            </Link>
            <span className={styles.login_text}>Yoki</span>
            <Link href={routes.SIGN_UP} className={styles.signup_btn}>
              {t("Auth.sign-up")}
            </Link>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default MobileDrawer;
