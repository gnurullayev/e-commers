import React, { FC } from "react";
import { Card as AntdCard } from "antd";
import styles from "./Card.module.css";
import Link from "next/link";
import { IProduct } from "@/interfaces/product";
import CartCounter from "../CartCounter";
import { dispatch } from "@/store";
import Image from "next/image";

interface ICardType {
  data: IProduct;
  path?: string;
}

const Card: FC<ICardType> = ({ data, path }) => {
  const handleAdd = () =>
    dispatch.products.addItem({
      id: data.id,
      name: data.name,
      price: data.price,
      quantity: 1,
    });

  const handleIncrease = (q: number) =>
    dispatch.products.updateItem({ id: data.id, quantity: q });

  const handleDecrease = (q: number) =>
    q === 0
      ? dispatch.products.removeItem(data.id)
      : dispatch.products.updateItem({ id: data.id, quantity: q });

  const cardContent = (
    <AntdCard
      hoverable
      style={{ width: 240 }}
      cover={
        <Image
          alt={data.name}
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCjJw75JbiFxbVI5MSHdJxR1sr0eMhYbA8XQ&s"
          }
        />
      }
      className={styles.card}
    >
      <b>${data.price}</b>
      <h3 className={styles.card_title}>{data.name}</h3>

      <CartCounter
        initialCount={0}
        productId={data.id}
        onAdd={handleAdd}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
    </AntdCard>
  );

  return path ? (
    <Link href={path} target="_blank" className={styles.card_link}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default Card;
