import { Flex, Spin } from "antd";
import styles from "./Loading.module.css";

const Loading = ({ width, height }: any) => (
  <div
    className={styles.loader}
    style={{
      width: width ? width : "100vw",
      height: height ? height : "100vh",
    }}
  >
    <Flex align="center" gap="middle">
      <Spin size="large" />
    </Flex>
  </div>
);

export default Loading;
