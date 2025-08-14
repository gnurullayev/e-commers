import { Breadcrumb, ConfigProvider } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import styles from "./SiteBreadcrumbs.module.css";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { IBreadcrumbData } from "@/interfaces";
import { FC } from "react";

interface IProps {
  breadcrumbData?: IBreadcrumbData[];
}

const SiteBreadcrumbs: FC<IProps> = ({ breadcrumbData }) => {
  const router = useRouter();
  const pathname = router.pathname.split("/");
  const t = useTranslations("Breadcrumb");

  const data = pathname.map((el, idx) => {
    if (el === "") {
      return {
        id: idx + 1,
        title: <Link href={routes.HOME}>{t("home")}</Link>,
      };
    } else if (pathname.length === idx + 1) {
      return {
        id: idx + 1,
        title: t(el),
      };
    }
    return {
      id: idx + 1,
      title: t(el),
      href: "/" + el,
    };
  });

  const items: any = breadcrumbData ? breadcrumbData : data;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgTextHover: "",
          fontSize: 16,
        },
        components: {
          Breadcrumb: {
            iconFontSize: 13,
            separatorMargin: 10,
            colorSuccessActive: "",
            linkHoverColor: "",
            linkColor: "#9896C0",
            lastItemColor: "#312E82",
            separatorColor: "#312e8280",
          },
        },
      }}
    >
      <div className={styles.breadcrumb}>
        <Breadcrumb
          className={styles.breadcrumb_inner}
          separator={<RightOutlined />}
          items={items}
        />
      </div>
    </ConfigProvider>
  );
};

export default SiteBreadcrumbs;
