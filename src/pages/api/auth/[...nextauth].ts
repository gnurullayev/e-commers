import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import { ICustomError, IUser } from "@/types";
import { routes } from "@/constants/routes";
import { API } from "@/services/api";

const CUSTOM_ERROR = "custom error";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<IUser | null | ICustomError> {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        try {
          const response = await API.postLogin({
            email: credentials.email,
            password: credentials.password,
          }).then((res) => res);

          if (response.success) {
            const user = { picture: response.data.image, ...response.data };
            return user;
          } else {
            return {
              id: "1",
              error: CUSTOM_ERROR,
              message: response.message,
            };
          }
        } catch (err: any) {
          return {
            id: "1",
            error: CUSTOM_ERROR,
            message: err.response.data.message,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: routes.LOGIN,
    signOut: "/auth/signout",
    error: routes.LOGIN,
  },
  callbacks: {
    async signIn({ user }) {
      if (user?.error === CUSTOM_ERROR) {
        throw new Error(user.message);
      }
      return true;
    },

    async jwt({ token, trigger, user, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session(data: any) {
      data.session = {
        ...data.session,
        user: { ...data.token },
      };
      return data.session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
