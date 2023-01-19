import { httpRequest } from "../utils/fetch";

interface loginPayload {
  email: string;
  password: string;
}
export const getToken: Function = () => {
  return localStorage.getItem("user_access_token");
};

export const loginAPI: Function = (payload: loginPayload) => {
  return httpRequest("post", "/api/auth/login", payload);
};

export const logoutAPI: Function = () => {
  const token = getToken();
  return httpRequest("post", "/api/auth/logout", {}, token);
};
