import { SignInSchema } from "@/app/signin/schema";
import { SignupSchema } from "@/app/signup/schema";
import * as axios from "@/config/axios";
import { Auth } from "@/types/auth";
import { APIReponse } from "@/types/common";
import { urls } from "@/utils/urls";

export const signin = (payload: SignInSchema) => {
  return axios
    .post<APIReponse<Auth>>(urls.signin, payload)
    .then((res) => res.data);
};

export const signup = (payload: SignupSchema) => {
  return axios
    .post<APIReponse<Auth>>(urls.signup, payload)
    .then((res) => res.data);
};
