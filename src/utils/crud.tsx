const LOCAL_SERVER = false;
const SERVER_URL = "https://home-library-server.herokuapp.com";
const LOCAL_SERVER_URL = "192.168.1.67";
const LOCAL_SERVER_PORT = 4000;

function getServerUrl() {
  if (!LOCAL_SERVER) {
    return `${SERVER_URL}`;
  } else {
    return `http://${LOCAL_SERVER_URL}:${LOCAL_SERVER_PORT}`;
  }
}

export const SERVER = getServerUrl();

export enum Status {
  ERROR = "error",
  SUCCESS = "success",
}

export enum Method {
  PUT = "PUT",
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

export enum viewState {
  MODULE = "module",
  LIST = "list",
  HEADLINE = "headline",
}
export const EXPORT_FILE_EXTENSION = ".csv";
export const MAXIMUM_VISIBLE_DESCRIPTION_LENGTH = 500;

export const isEmpty = (object: Object) => {
  return Object.keys(object).length === 0 || JSON.stringify(object) === "{}";
};
