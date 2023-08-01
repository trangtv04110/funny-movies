export const truncate = (string: string, limit: number) => {
  if (string.length <= limit) return string;

  return string.slice(0, limit) + "...";
};

export const validateEmail = (email: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
