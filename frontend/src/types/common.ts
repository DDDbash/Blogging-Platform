import { AxiosError } from "axios";

export type APIReponse<T = null> = {
  data: T;
};

export type APIErrorWrapper<T = null> = AxiosError<{
  message: T;
}>;
