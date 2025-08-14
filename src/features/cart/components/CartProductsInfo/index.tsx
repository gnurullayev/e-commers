import React, { FC } from "react";
import { CartProduct } from "@/interfaces/product";
import styles from "./CartProductsInfo.module.css";
import { ErrorBoundary } from "@/components";
import OrderSummary from "../OrderSummary";
import CartProductInfo from "../CartProductInfo";

interface IProps {
  cartProducts: CartProduct[];
}
const CartProductsInfo: FC<IProps> = ({ cartProducts }) => {
  return (
    <div className={styles.cart_product_info}>
      <div className={styles.product_list}>
        {cartProducts.map((item) => (
          <CartProductInfo product={item} key={item.id} />
        ))}
      </div>

      <ErrorBoundary>
        <OrderSummary products={cartProducts} />
      </ErrorBoundary>
    </div>
  );
};

export default CartProductsInfo;
