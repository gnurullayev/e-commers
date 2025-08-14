import { CartCounter } from "@/components";
import { CartProduct } from "@/interfaces/product";
import { dispatch } from "@/store";
import { Card } from "antd";
import React, { FC } from "react";
import styles from "./CartProductInfo.module.css";

interface IProps {
  product: CartProduct;
}

const CartProductsInfo: FC<IProps> = ({ product }) => {
  const CardTitle = (data: CartProduct) => {
    return (
      <>
        <h3>{data.name}</h3>
        <b>Narxi: ${data.price}</b>
      </>
    );
  };

  const totalSum = (product.price * product.quantity).toFixed(2);

  return (
    <Card title={CardTitle(product)} variant="borderless">
      <div className={styles.card_content}>
        <CartCounter
          initialCount={product.quantity}
          productId={product.id}
          onAdd={() =>
            dispatch.products.addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
            })
          }
          onIncrease={(q) =>
            dispatch.products.updateItem({ id: product.id, quantity: q })
          }
          onDecrease={(q) =>
            q === 0
              ? dispatch.products.removeItem(product.id)
              : dispatch.products.updateItem({ id: product.id, quantity: q })
          }
        />
        <p className={styles.product_sum}>
          Summa: <b>${totalSum}</b>{" "}
        </p>
      </div>
    </Card>
  );
};

export default CartProductsInfo;
