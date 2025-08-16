import { routes } from "@/constants/routes";
import Link from "next/link";
import React from "react";
import styles from "./HeaderBottom.module.css";
import { LanguageDropdown, MobileDrawer } from "@/components";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const HeaderBottom = () => {
  const cartProductCount = useSelector(
    (state: RootState) => state.products.cartProducts?.length
  );

  return (
    <div className={`${styles.subheader} subheader`}>
      <div className="container">
        <div className={styles.subheader_inner}>
          <Link href={routes.HOME} className={styles.logo_link}>
            E-commerce
          </Link>

          <ul className={styles.list_tablet}>
            <li className={`${styles.list_tablet_item}`}>
              <Link href={routes.CART} className={styles.header_cart}>
                <ShoppingCartOutlined />
                {cartProductCount > 0 && (
                  <span className={styles.product_count}>
                    {cartProductCount}
                  </span>
                )}
              </Link>
            </li>

            <li
              className={`${styles.list_tablet_item} ${styles.list_tablet_item_lenguage}`}
            >
              <LanguageDropdown isAuth={true} />
            </li>

            <li className={styles.list_tablet_item}>
              <MobileDrawer />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
