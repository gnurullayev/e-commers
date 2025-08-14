import React from "react";
import uz from "../translate/uz.json";
import en from "../translate/en.json";
import { IntlProvider } from "next-intl";
import { useRouter } from "next/router";

interface IntlProviderWrapperProps {
  children: React.ReactNode;
}

const IntlProviderWrapper = ({ children }: IntlProviderWrapperProps) => {
  const router = useRouter();

  const messages = router?.locale === "uz" ? uz : en;

  return (
    <IntlProvider locale={router?.locale ?? "uz"} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default IntlProviderWrapper;
