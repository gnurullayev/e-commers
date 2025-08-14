import { Input } from "@/components";
import React, { FC, useState } from "react";
import styles from "./SearchProducts.module.css";
import Image from "next/image";
import { searchBarBlackIcon } from "@/assets/icons";
import { Button, Form } from "antd";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services/api";
import { useTranslations } from "next-intl";

interface IProps {
  mutateFunction: (a: number) => void;
  isPending: boolean;
  setSearchData: (a: any) => void;
  setTotalProducts: (a: any) => void;
}

const SearchProducts: FC<IProps> = ({
  mutateFunction,
  isPending,
  setSearchData,
  setTotalProducts,
}) => {
  const [data, setData] = useState({ name: "", category: "" });
  const t = useTranslations("SearchProducts");
  const mutation = useMutation({
    mutationFn: () =>
      API.getSearchProducts({ name: data.name, category: data.category }),
    onSuccess: (response) => {
      if (response) {
        setSearchData(response.content);
        setTotalProducts(response.numberOfElements);
      }
    },
    onError: (error: any) => {
      console.error(error.message);
    },
  });

  const handleSearch = (event: any) => {
    if (event.searchByName || event.searchByCategory) {
      const newData = {
        name: event.searchByName,
        category: event.searchByCategory,
      };
      mutation.mutate();
      setData(newData);
    }
  };

  const onValueChange = (event: any) => {
    if (!event.searchByName && !event.searchByCategory) {
      mutateFunction(1);
    }
  };

  return (
    <section>
      <div className={styles.products_search}>
        <Form
          onValuesChange={onValueChange}
          onFinish={handleSearch}
          className={styles.products_search_form}
        >
          <div className={styles.searchbar}>
            <Input
              inputClass={styles.input_label}
              name="searchByName"
              list={false}
              placeholder={t("searchByName")}
            />
            <Input
              inputClass={styles.input_label}
              name="searchByCategory"
              list={false}
              placeholder={t("searchByCategory")}
            />

            <Button
              htmlType="submit"
              className={styles.products_search_btn}
              loading={isPending || mutation.isPending}
            >
              <span className={styles.searchbar_btn_txt}>{t("search")}</span>
              <Image
                className={styles.searchbar_icon}
                src={searchBarBlackIcon}
                alt="#"
              />
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default SearchProducts;
