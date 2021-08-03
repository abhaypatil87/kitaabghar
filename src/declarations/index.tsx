export interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface User {
  token?: string;
  first_name: string;
  last_name: string;
  image_url: string;
  email: string;
}

export interface DecodedToken {
  exp: number;
}

export interface AuthorType {
  author_id: string;
  first_name: string;
  last_name: string;
}

export interface BookType {
  book_id?: string;
  title: string;
  subtitle: string;
  thumbnail_url: string;
  isbn_10: string;
  isbn_13: string;
  page_count: number;
  author: string;
  description: string;
}

export type BookTileProps = BookType & {
  viewMode?: string;
};

export type ThirdPartyApisType = {
  google_books: boolean;
  open_library: boolean;
};

export enum ExternalIdentifiers {
  GOOGLE = "GOOGLE",
}

export enum SearchType {
  SEARCH = "search",
  FILTER = "filter",
}

export type SignUpProps = {
  readonly email: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly password: string;
  external_id: null;
};

export type SignInProps = {
  readonly email: string;
  readonly password?: string;
  image_url?: string;
  first_name?: string;
  last_name?: string;
  external?: ExternalIdentifiers;
  token?: string;
};
