const LOCAL_SERVER = false;
const SERVER_URL = "https://home-library-server.herokuapp.com";
const LOCAL_SERVER_URL = "192.168.1.67";
const SERVER_PORT = 4000;

function getServerUrl() {
  if (!LOCAL_SERVER) {
    return `${SERVER_URL}`;
  } else {
    return `http://${LOCAL_SERVER_URL}:${SERVER_PORT}`;
  }
}

export const SERVER = getServerUrl();

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
