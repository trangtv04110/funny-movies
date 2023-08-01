import JwtDecode from "jwt-decode";

export const getRawToken = () => localStorage.getItem("token");

export const getParsedToken = () => {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (token && token.length > 0 && token !== '""') {
    const data = JwtDecode(token) as any;
    return { email: data.email, exp: data.exp };
  }
  return null;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const isLoggedIn = () => {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  return !!token;
};

export const logout = () => {
  localStorage.setItem("token", "");
  window.location.reload();
};
