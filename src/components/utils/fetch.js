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

  // if (result.message === "UNAUTHENTICATED_ERROR") {

  // }

  return result;
};
