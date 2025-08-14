import { Card } from "@/components";
import { useTranslations } from "next-intl";
import React, { FC, useState } from "react";
import styles from "./Products.module.css";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services/api";
import { routes } from "@/constants/routes";
import { IProduct } from "@/interfaces/product";
import SearchProducts from "../SearchProducts";
import { Pagination, PaginationProps } from "antd";

interface IProps {
  products: IProduct[];
  total?: number | null;
  title?: string;
}

const Products: FC<IProps> = ({ products, total = 0 }) => {
  const t = useTranslations("ProductPage");
  const [productData, setProductData] = useState(products);
  const [totalProducts, setTotalProducts] = useState(total);
  const [current, setCurrent] = useState(1);

  const { mutate, isPending } = useMutation({
    mutationFn: (page: number) => API.getProducts(page),
    onSuccess: (response) => {
      if (response) {
        setProductData(response.content);
        setTotalProducts(response.numberOfElements);
      }
    },
    onError: (error: any) => {
      console.error(error.message);
    },
  });

  const onChange: PaginationProps["onChange"] = (page) => {
    mutate(page);
    setCurrent(page);
  };

  return (
    <>
      <div className={styles.product_search}>
        <SearchProducts
          mutateFunction={mutate}
          isPending={isPending}
          setSearchData={setProductData}
          setTotalProducts={setTotalProducts}
        />
      </div>

      <div className={styles.card_container}>
        {productData.length > 0 ? (
          productData?.map((item, idx) => (
            <Card
              key={idx}
              data={item}
              path={`${routes.PRODUCTS}/${item.id}`}
            />
          ))
        ) : (
          <p>{t("notFoundProducts")}</p>
        )}
      </div>

      {!!totalProducts && totalProducts > 9 && (
        <div className={styles.paginatoin_container}>
          <Pagination
            current={current}
            onChange={onChange}
            total={totalProducts}
          />
        </div>
      )}
    </>
  );
};

export default Products;
