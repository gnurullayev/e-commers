import React from "react";
import { ConfigProvider } from "antd";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { AuthLayout, MainLayout, RouteLoader } from "@/components";
import IntlProviderWrapper from "@/utils/intlWrapperProvider";
import { SessionProvider } from "next-auth/react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/store";
import "@/styles/globals.css";
import "@/styles/normalize.css";

const queryClient = new QueryClient();

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteLoader>
        <Provider store={store}>
          <SessionProvider session={session}>
            <ConfigProvider>
              <IntlProviderWrapper>
                <AuthLayout>
                  <MainLayout>
                    <ErrorBoundary>
                      <Component {...pageProps} />
                    </ErrorBoundary>
                  </MainLayout>
                </AuthLayout>
              </IntlProviderWrapper>
            </ConfigProvider>
          </SessionProvider>
        </Provider>
      </RouteLoader>
    </QueryClientProvider>
  );
};

export default MyApp;
