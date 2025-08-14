import { routes } from "@/constants/routes";
import { message } from "antd";
const changePageTimeout = (path: string, router: any) => {
  setTimeout(() => {
    router.push(path);
  }, 2000);
};

export const showResponse = ({ response, router }: any) => {
  if (response.success) {
    message.success("Electron pochtangiz tasdiqlandi");
    router.push(routes.LOGIN);
    changePageTimeout(routes.LOGIN, router);
  } else if (response.message === "passwords.token") {
    message.error(
      "Token eskirgan, qaytadan email va yangi parolingizni yuboring"
    );
  } else {
    message.info(response.message);
    changePageTimeout(routes.HOME, router);
  }
};
