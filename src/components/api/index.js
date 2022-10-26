import { httpRequest } from "../utils/fetch";

export const loginAPI = (payload) => {
  return httpRequest("post", "/api/auth/login", payload);
};
