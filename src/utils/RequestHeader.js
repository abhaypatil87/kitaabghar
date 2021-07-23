import { LOCAL_STORAGE_USER_KEY } from "./crud";

export class RequestHeader {
  constructor() {
    this.header = {};
  }

  addAuthorisation() {
    let user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
    if (user && user.token) {
      this.header = { ...this.header, Authorization: `Bearer ${user.token}` };
    }
    return this;
  }

  addContentType(contentType) {
    this.header = { ...this.header, "Content-Type": contentType };
    return this;
  }

  getHeader() {
    return this.header;
  }
}
