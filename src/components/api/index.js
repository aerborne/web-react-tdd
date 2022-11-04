import { httpRequest } from "../utils/fetch";

export const loginAPI = (payload) => {
  return httpRequest("post", "/api/auth/login", payload);
};

export const logoutAPI = () => {
  const token = getToken();
  return httpRequest("post", "/api/auth/logout", {}, token);
};

export const storeDocumentAPI = (payload) => {
  const token = getToken();
  return httpRequest("post", "/api/document", payload, token);
};

export const getAllDocumentsAPI = () => {
  const token = getToken();
  return httpRequest("get", "/api/document", {}, token);
};

export const getDocumentByIdAPI = (id) => {
  const token = getToken();
  return httpRequest("get", `/api/document/${id}`, {}, token);
};

export const getToken = () => {
  return localStorage.getItem("user_access_token");
};
