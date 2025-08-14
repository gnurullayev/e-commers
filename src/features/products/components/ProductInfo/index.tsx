import { Card } from "@/components";
import { IProduct } from "@/interfaces/product";
import React, { FC } from "react";
import styles from "./ProductInfo.module.css";

interface IProductInfoProps {
  product: IProduct;
}

const ProductInfo: FC<IProductInfoProps> = ({ product }) => {
  return (
    <div className={styles.product_info}>
      <h2 className={styles.product_title}>{product.name}</h2>
      <p className={styles.product_category}>{product.category}</p>

      <Card data={product} />
    </div>
  );
};

export default ProductInfo;
