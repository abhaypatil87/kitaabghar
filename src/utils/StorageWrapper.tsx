import { Storage } from "../declarations";

export default abstract class StorageWrapper<T extends string> {
  private readonly storage: Storage;

  protected constructor(getStorage = (): Storage => window.localStorage) {
    this.storage = getStorage();
  }

  protected get(key: T): null | any {
    const item = this.storage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item);
  }

  protected set(key: T, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  protected clearItem(key: T): void {
    this.storage.removeItem(key);
  }

  protected clearItems(keys: T[]): void {
    keys.forEach((key) => this.clearItem(key));
  }
}
