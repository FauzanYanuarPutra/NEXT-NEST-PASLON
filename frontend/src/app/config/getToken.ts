import { setAuthHeader } from "./paslonApi";

export const getToken = () => {
  const token = localStorage.getItem("token");
  setAuthHeader(token);
}