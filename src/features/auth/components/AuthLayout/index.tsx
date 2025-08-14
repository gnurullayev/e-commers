import { ReactNode } from "react";
import styles from "./AuthLayout.module.css";
interface IAuthLayout {
  children: ReactNode;
}

const Authlayout = ({ children }: IAuthLayout) => {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Authlayout;
