import JwtDecode from "jwt-decode";

export const getRawToken = () => localStorage.getItem("token");

export const getParsedToken = () => {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (token && token.length > 0 && token !== '""') {
    return new JwtDecode(token);
  }
  return null;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;
  const tokenObj = getParsedToken();
  return !!tokenObj;
};

export const logout = () => {
  localStorage.setItem("token", "");
  window.location.reload();
};
