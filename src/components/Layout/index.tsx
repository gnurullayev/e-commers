import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { Headers } from "..";
import styles from "./Layout.module.css";
import ErrorBoundary from "../ErrorBoundary";

interface ILayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: ILayoutProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.layout_inner}>
        <ErrorBoundary>
          <Headers />
        </ErrorBoundary>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
