import { message } from "antd";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
interface IError {
  message: string;
  status: number;
}

function useHandleError(error: IError | undefined) {
  const [title, setTitle] = useState(error);
  useEffect(() => {
    if (title?.status === 401) {
      message.error(error?.message);
      setTimeout(() => {
        signOut({ redirect: true });
      }, 3000);
    }
  }, [title, error]);

  const handleError = (error: IError | undefined) => {
    setTitle(error);
  };

  return [handleError];
}

export default useHandleError;
