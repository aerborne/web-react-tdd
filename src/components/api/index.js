import { httpRequest } from "../utils/fetch";

export const loginAPI = (payload) => {
  return httpRequest("post", "/api/auth/login", payload);
};

export const storeDocumentAPI = (payload) => {
  const token = getToken();
  return httpRequest("post", "/api/document", payload, token);
};

export const getToken = () => {
  return localStorage.getItem("user_access_token");
};
