import { ErrorBoundary, PageLayout, SiteBreadcrumbs } from "@/components";
import { OrderSummary, CartProductsInfo } from "@/features/cart";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartProducts = useSelector(
    (state: RootState) => state.products.cartProducts
  );
  return (
    <PageLayout metaTitle={"Byurtmalar"}>
      <ErrorBoundary>
        <SiteBreadcrumbs />
      </ErrorBoundary>

      <ErrorBoundary>
        <CartProductsInfo cartProducts={cartProducts} />
      </ErrorBoundary>
    </PageLayout>
  );
};

export default Cart;
