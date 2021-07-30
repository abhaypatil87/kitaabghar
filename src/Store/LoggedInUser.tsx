import StorageWrapper from "../utils/StorageWrapper";
import { User } from "../declarations";

enum Keys {
  USER = "user",
}

export default class LoggedInUser extends StorageWrapper<Keys> {
  private static instance?: LoggedInUser;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new LoggedInUser();
    }

    return this.instance;
  }

  public getLoggedInUser() {
    return this.get(Keys.USER);
  }

  public setLoggedInUser(loggedInUser: User) {
    this.set(Keys.USER, loggedInUser);
  }

  public clear() {
    this.clearItems([Keys.USER]);
  }
}
