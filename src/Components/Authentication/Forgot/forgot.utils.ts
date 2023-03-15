export const isEmail = (str: string) => {
  try {
    return str.split("@")[1].includes(".");
  } catch {
    return false;
  }
};
