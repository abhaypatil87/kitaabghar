export const SERVER_URL = "192.168.1.67";
export const SERVER_PORT = 4000;

export const ERROR = "error";
export const SUCCESS = "success";
export const LOCAL_STORAGE_USER_KEY = "user";

export const viewState = {
  MODULE: "module",
  LIST: "list",
  HEADLINE: "headline",
};
export const EXPORT_FILE_EXTENSION = ".csv";

export const isEmpty = (object) => {
  return Object.keys(object).length === 0 || JSON.stringify(object) === "{}";
};
