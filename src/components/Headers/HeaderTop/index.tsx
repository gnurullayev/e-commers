import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, UserIcon } from "@/assets/icons";
import styles from "./HeaderTop.module.css";
import { routes } from "@/constants/routes";
import { useSession } from "next-auth/react";
import { LanguageDropdown } from "@/components";
import { useTranslations } from "next-intl";

const HeaderTop = () => {
  const { data } = useSession();
  const t = useTranslations("Header");
  const userImage = data?.user?.picture ? data?.user?.picture : UserIcon;

  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.header_inner}>
          <div className={styles.header_start}>
            <Link href={routes.HOME} className={styles.logo_link}>
              E-commerce
            </Link>
          </div>

          <div className={styles.header_end}>
            <LanguageDropdown isAuth={true} />

            {data ? (
              <Link href={"/"} className={styles.header_item_profile}>
                <span className={styles.header_item_profile_span}>
                  {data.user.last_name + " " + data.user.name}
                </span>

                <Image
                  src={userImage}
                  alt="User icon"
                  className={styles.header_item_profile_img}
                  width={24}
                  height={24}
                />
              </Link>
            ) : (
              <div className={styles.header_end_login}>
                <Link href={routes.LOGIN} className={styles.header_login}>
                  Kirish
                </Link>

                <span className={styles.header_end_span}>Yoki</span>

                <Link href={routes.SIGN_UP} className={styles.header_signup}>
                  Ro’yxatdan o’tish
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
