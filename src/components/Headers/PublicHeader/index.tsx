import Image from "next/image";
import React from "react";
import styles from "./public-header.module.css";
import { routes } from "@/constants/routes";
import Link from "next/link";
import { LanguageDropdown } from "@/components";

const PublicHeader = () => {
  return (
    <header className={styles.public_header}>
      <div className="container">
        <div className={styles.public_header__inner}>
          <Link href={routes.HOME} className={styles.logo}>
            <Image src={"/"} alt="logo1" className="logo_img" fill={true} />
          </Link>

          <LanguageDropdown isAuth={false} />
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
