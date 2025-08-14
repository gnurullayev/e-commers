import React, { createContext, useState } from "react";

export interface IAuthContext {
  token: string;
  isLogged: boolean;
}
export type IAuthContextType = {
  authData: IAuthContext;
  handleAuthData: () => void;
};
const CreateUthContext = createContext<IAuthContextType>({
  authData: { token: "", isLogged: false },
  handleAuthData() {},
});

const AuthContext = ({}) => {
  const [authData, setAuthData] = useState<IAuthContext>({
    token: "",
    isLogged: false,
  });

  const handleAuthData = () => {
    setAuthData({
      token: "",
      isLogged: false,
    });
  };

  return (
    <CreateUthContext.Provider
      value={{ authData, handleAuthData }}
    ></CreateUthContext.Provider>
  );
};

export default AuthContext;
