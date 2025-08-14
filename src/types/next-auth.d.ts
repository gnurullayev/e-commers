import { DefaultSession } from "next-auth";
import { ICustomError, IUser } from ".";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: IUser;
    token: string;
  }
  interface User extends DefaultUser {
    id: string;
    error: string;
    message: string;
  }
}

declare module "react-pdf/dist/esm/entry.webpack";
