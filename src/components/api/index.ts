import { httpRequest } from "../utils/fetch";

interface loginPayload {
  email: string;
  password: string;
}

export const loginAPI: Function = (payload: loginPayload) => {
  return httpRequest("post", "/api/auth/login", payload);
};

export const logoutAPI: Function = () => {
  const token = getToken();
  return httpRequest("post", "/api/auth/logout", {}, token);
};

export const storeDocumentAPI: Function = (payload: object) => {
  const token = getToken();
  return httpRequest("post", "/api/document", payload, token);
};

export const getAllDocumentsAPI: Function = () => {
  const token = getToken();
  return httpRequest("get", "/api/document", {}, token);
};

export const getDocumentByIdAPI: Function = (id: string | number) => {
  const token = getToken();
  return httpRequest("get", `/api/document/${id}`, {}, token);
};

export const getToken: Function = () => {
  return localStorage.getItem("user_access_token");
};

export const deleteDocumentByIdAPI: Function = (id: string | number) => {
  const token = getToken();
  return httpRequest("delete", `/api/document/${id}`, {}, token);
};
