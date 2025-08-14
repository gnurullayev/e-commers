import ErrorBoundary from "@/components/ErrorBoundary";
import PageLayout from "@/components/Layout/PageLayout";
import { ErrorUi } from "@/features/404";
import { useTranslations } from "next-intl";

import React from "react";

const Custom500 = () => {
  const t = useTranslations("ServerError");
  return (
    <PageLayout metaTitle={t("metaTitleError")}>
      <ErrorBoundary>
        <ErrorUi errorType="500" errorText={t("errorText")} />
      </ErrorBoundary>
    </PageLayout>
  );
};

export default Custom500;
