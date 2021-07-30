import { loggedInUser } from "../Store/store";

export class RequestHeader {
  private header: HeadersInit;
  constructor() {
    this.header = {};
  }

  addAuthorisation() {
    let user = loggedInUser.getLoggedInUser();
    if (user && user.token) {
      this.header = { ...this.header, Authorization: `Bearer ${user.token}` };
    }
    return this;
  }

  addContentType(contentType: string) {
    this.header = { ...this.header, "Content-Type": contentType };
    return this;
  }

  getHeader() {
    return this.header;
  }
}
