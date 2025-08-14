import { message } from "antd";
import Axios from "axios";
import { getToken } from "next-auth/jwt";
import { getSession, signOut } from "next-auth/react";

// export const BASE_URL = "https://api-e-commerce.tenzorsoft.uz/";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const axiosInstance = Axios.create({
  baseURL: BASE_URL,

  headers: {
    Accept: "application/json,text/*;q=0.99",
    "Content-Type": "application/json",
  },
});

export const axiosHeadersSetToken = async (context: any) => {
  const user: any = await getToken({ req: context.req });
  if (user?.token) {
    axiosInstance.defaults.headers.common = {
      Authorization: `Bearer ${user.token}`,
      "Accept-Language": context.locale,
    };
  }
  axiosInstance.defaults.headers.common = {
    ...axiosInstance.defaults.headers.common,
    "Accept-Language": context.locale,
  };
};

export const errorShow = (code: number) => {
  message.error(
    `Backentda hatolik chiqdi, mutaxasisga murojat qiling. Hatolik  ko'di ${code}`
  );
};

// run before each request
axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      let session: any = await getSession();
      const token = "Bearer " + session?.user?.token;

      if (session?.user?.token) {
        config.headers.Authorization = token;
      }
    }

    return config;
  },

  (error) => Promise.reject(error)
);

// run after each response
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    // if unauthenticated error, reset persisted data and log out the user
    if (typeof window !== "undefined") {
      if (status === 401) {
        console.log("Run after api call", status);
        message.error(error?.message);
        setTimeout(() => {
          signOut({ redirect: true });
        }, 3000);
        return error;
      }
    }
    return Promise.reject(error);
  }
);

export const API = {
  //Products
  getProducts: (page = 1, size = 9) =>
    axiosInstance
      .get(`/products?page=${page}&size=${size}`)
      .then((res) => res.data?.data),
  getSearchProducts: (params: { name?: string; category?: string }) =>
    axiosInstance({
      url: "/products/search",
      params,
    }).then((res) => res.data?.data),
  getProductDetail: (id: number) =>
    axiosInstance.get(`/products/${id}`).then((res) => res.data.data),

  //Authpage
  postSignUp: (data: any) =>
    axiosInstance.post("/auth/register", data).then((res) => res.data),
  postLogin: (data: any) =>
    axiosInstance.post("/auth/login", data).then((res) => res.data),
};
