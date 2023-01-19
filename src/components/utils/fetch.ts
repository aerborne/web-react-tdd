import axios, { AxiosRequestConfig, ResponseType } from "axios";

export const httpRequest = async (
  method: string,
  url: string,
  data: any,
  token?: string,
  content_type = "application/json",
  responseType: ResponseType = "json"
) => {
  if (!window.navigator.onLine) throw new Error("no_internet");

  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_API;
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": content_type,
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      method,
      url: `${BACKEND_URL}${url}`,
      data: data,
      responseType: responseType,
    };
    const result = await axios(config);
    return result;
  } catch (error: any) {
    // unauthenticated catch
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.clear();
      window.location.href = "/login?alert=login_expired";
    }
  }
};
