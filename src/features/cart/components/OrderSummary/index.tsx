import React, { FC } from "react";
import styles from "./OrderSummary.module.css";
import { useSession } from "next-auth/react";
import { routes } from "@/constants/routes";
import Link from "next/link";
import { Modal } from "antd";
import { CartProduct } from "@/interfaces/product";
interface IProps {
  products: CartProduct[];
}

const OrderSummary: FC<IProps> = ({ products = [] }) => {
  const { data } = useSession();
  const warning = () => {
    Modal.warning({
      title: "Sis sayitdan ro'yhatdan o'tishingiz kerak",
      content: (
        <Link href={routes.LOGIN} className={styles.header_signup}>
          Kirish
        </Link>
      ),
    });
  };

  const totalPrice = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.order_summary}>
      <h3 className={styles.order_summary_title}>Buyurtmangiz</h3>
      <span className={styles.order_summary_text}>
        Mahsulotlar ({products?.length})
      </span>
      <span className={styles.order_summary_sum_txt}>
        Jami: <b>{totalPrice?.toFixed(2)}</b>
      </span>

      {!!products?.length && (
        <>
          {data ? (
            <Link href={"#"} className={styles.header_login}>
              Buyurtmani rasmiylashtirish
            </Link>
          ) : (
            <div className={styles.header_signup}>
              <span onClick={warning} className={styles.header_login}>
                Buyurtmani rasmiylashtirish
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderSummary;
