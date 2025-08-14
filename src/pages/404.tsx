/** @format */

import React from "react";
import { ErrorUi } from "@/features/404";
import { useTranslations } from "next-intl";
import PageLayout from "@/components/Layout/PageLayout";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");
  return (
    <PageLayout metaTitle={t("metaTitleError")}>
      <ErrorBoundary>
        <ErrorUi errorType='404' errorStatus={t("errorStatus")} errorText={t("errorText")}/>
      </ErrorBoundary>
    </PageLayout>
  );
}
