import { ICustomApiError } from "@/interfaces";

export const filterOption = (
  input: string,
  option?: { label: string; value: string }
) =>
  (option?.label.toLocaleLowerCase() ?? "").includes(input.toLocaleLowerCase());

export const formattedDate = (value: string) => {
  const d = new Date(value);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear().toString();
  const date = `${day}.${month}.${year}`;

  return date; //04.03.2025
};

export const changeError = (error: any): ICustomApiError => {
  const status = error?.response?.status ?? 500;
  const message = error?.message ?? "An error occurred";

  return {
    status,
    message,
  };
};

export function setCookie(cname: string, cvalue: string, time: Date) {
  let expires = "expires=" + time.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function removeCookieItem(key: string) {
  const currentTime = new Date();
  const newTime = new Date(currentTime.getTime() - 3600);

  setCookie(key, "", newTime);
}

export function getCookie(cname: string) {
  if (typeof window === "object") {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return "";
}

export const encryptedData = (value: string) => {
  if (value) {
    return btoa(value);
  }
  return "";
};

export const decryptedData = (key: string) => {
  if (key) {
    return atob(key);
  }
  return "";
};
