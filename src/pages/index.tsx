import React from "react";
import PageLayout from "@/components/Layout/PageLayout";
import { API, axiosHeadersSetToken, errorShow } from "@/services/api";
import ErrorBoundary from "@/components/ErrorBoundary";
import { changeError } from "@/utils";
import { ICustomApiError } from "@/interfaces";
import { Products } from "@/features/home";
import { IProduct } from "@/interfaces/product";

interface HomeProps {
  products: IProduct[];
  totalProducts: number;
  error?: ICustomApiError;
}

export default function Home({ products, error, totalProducts }: HomeProps) {
  if (error) {
    errorShow(error.status);
    console.error("Error", error);
  }

  return (
    <PageLayout metaTitle="E-commerce">
      <ErrorBoundary>
        <Products products={products} total={totalProducts} />
      </ErrorBoundary>
    </PageLayout>
  );
}

export const getServerSideProps = async (context: any) => {
  await axiosHeadersSetToken(context);

  try {
    const productsResponse = await API.getProducts();

    return {
      props: {
        products: productsResponse.content || [],
        totalProducts: productsResponse.numberOfElements,
      },
    };
  } catch (error: any) {
    return {
      props: {
        products: null,
        error: changeError(error),
      },
    };
  }
};
