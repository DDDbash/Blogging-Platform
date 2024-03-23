import { AxiosRequestConfig } from "axios";

import * as axios from "@/config/axios";
import { APIReponse } from "@/types/common";
import { User } from "@/types/user";
import { urls } from "@/utils/urls";

export const getProfile = (config?: AxiosRequestConfig) => {
  return axios
    .get<APIReponse<User>>(urls.profile, {
      ...config,
    })
    .then((res) => res.data);
};
