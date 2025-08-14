import { useEffect, useState } from "react";
import styles from "./CartCounter.module.css";
import { useTranslations } from "next-intl";
import { Button } from "../Common/Button";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface CartCounterProps {
  initialCount?: number;
  productId: number;
  onAdd?: () => void;
  onIncrease?: (newCount: number) => void;
  onDecrease?: (newCount: number) => void;
}

const CartCounter: React.FC<CartCounterProps> = ({
  initialCount = 0,
  onAdd,
  onIncrease,
  onDecrease,
  productId,
}) => {
  const t = useTranslations("Card");
  const [count, setCount] = useState(initialCount);

  const quantityInCart = useSelector(
    (state: RootState) =>
      state.products.cartProducts.find((item) => item.id === productId)
        ?.quantity || 0
  );

  useEffect(() => {
    setCount(quantityInCart);
  }, [quantityInCart]);

  const handleAdd = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setCount(1);
    onAdd?.();
  };

  const handleIncrease = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const newCount = count + 1;
    setCount(newCount);
    onIncrease?.(newCount);
  };

  const handleDecrease = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onDecrease?.(newCount);
    } else {
      setCount(0);
      onDecrease?.(0);
    }
  };

  return (
    <div className={styles.cart_counter}>
      {count === 0 ? (
        <button className={styles.cart_counter_btn} onClick={handleAdd}>
          {t("add-to-cart")}
        </button>
      ) : (
        <div className={styles.cart_counter_inner}>
          <Button
            label="-"
            className={styles.cart_counter_dic}
            onClick={handleDecrease}
          />
          <span>{count}</span>
          <Button
            label="+"
            className={styles.cart_counter_inc}
            onClick={handleIncrease}
          />
        </div>
      )}
    </div>
  );
};

export default CartCounter;
