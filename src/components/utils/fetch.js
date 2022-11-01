import axios from "axios";

export const httpRequest = async (
  method,
  url,
  data,
  token,
  content_type = "application/json",
  responseType = "json"
) => {
  if (!window.navigator.onLine) throw new Error("no_internet");

  try {
    const result = await axios({
      headers: {
        "Content-Type": content_type,
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: method,
      url: import.meta.env.VITE_BACKEND_API + url,
      data: data,
      responseType: responseType,
    });
    return result;
  } catch (error) {
    // unauthenticated catch
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.clear();
      window.location.href = "/login?alert=login_expired";
    }
    s;
  }

  // if (result.message === "UNAUTHENTICATED_ERROR") {

  // }
};
