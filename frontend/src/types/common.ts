import { AxiosError } from "axios";

export type APIReponse<T = null> = {
  data: T;
  message?: string;
};

export type APIErrorWrapper<T = null> = AxiosError<{
  message: T;
}>;

export type Meta = {
  page: number;
  perPage: number;
  total: number;
};

export type PaginationParams = {
  page: number;
  limit: number;
};

export type APIPaginationResponse<T = null> = {
  data: T[];
  message?: string;
  meta: Meta;
};
