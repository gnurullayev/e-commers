import React, { FC } from "react";
import { SiteBreadcrumbs } from "@/components";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageLayout from "@/components/Layout/PageLayout";
import { API, axiosHeadersSetToken, errorShow } from "@/services/api";
import { changeError } from "@/utils";
import { ICustomApiError } from "@/interfaces";
import { ProductInfo } from "@/features/products/components";
import { IProduct } from "@/interfaces/product";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { useTranslations } from "next-intl";

interface IDetailProps {
  product: IProduct;
  error: ICustomApiError;
}

const SingleProduct: FC<IDetailProps> = ({ error, product }) => {
  const t = useTranslations();
  if (error) {
    errorShow(error.status);
    return null;
  }

  const breadcrumbData = (t: any) => {
    return [
      {
        id: 1,
        title: <Link href={routes.HOME}>{t("Breadcrumb.home")}</Link>,
      },
      {
        id: 3,
        title: <span>{product?.name}</span>,
      },
    ];
  };
  console.log("product", product);

  return (
    <PageLayout metaTitle={product.name}>
      <ErrorBoundary>
        <SiteBreadcrumbs breadcrumbData={breadcrumbData(t)} />
      </ErrorBoundary>

      <ErrorBoundary>
        <ProductInfo product={product} />
      </ErrorBoundary>
    </PageLayout>
  );
};

export default SingleProduct;

export const getServerSideProps = async (context: any) => {
  await axiosHeadersSetToken(context);
  const id = context.query.id;

  try {
    const productResponse = await API.getProductDetail(id);

    return {
      props: {
        product: productResponse ?? null,
      },
    };
  } catch (error: any) {
    return {
      props: {
        product: null,
        error: changeError(error),
      },
    };
  }
};
