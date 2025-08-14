import React, { ReactNode } from "react";
import { MetaData } from "..";
import ErrorBoundary from "../ErrorBoundary";

interface IPageLayoutProps {
  children: ReactNode;
  metaTitle?: string;
}
const PageLayout = ({ metaTitle, children }: IPageLayoutProps) => {
  return (
    <div>
      <MetaData title={metaTitle ?? "Infocom"} />

      <div className="container">
        <div className="page_inner">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
