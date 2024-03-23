import { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

import * as axios from "@/config/axios";
import { APIReponse } from "@/types/common";
import { User } from "@/types/user";
import { ACCESS_TOKEN } from "@/utils/constants";
import { urls } from "@/utils/urls";

export const getProfileServer = async () => {
  const nextCookies = cookies();
  const accessToken = nextCookies.get(ACCESS_TOKEN)?.value ?? "";

  try {
    const res = await getProfile({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      data: res.data,
      err: null,
    };
  } catch (err) {
    return {
      data: null,
      err,
    };
  }
};

export const getProfile = (config?: AxiosRequestConfig) => {
  return axios
    .get<APIReponse<User>>(urls.profile, {
      ...config,
    })
    .then((res) => res.data);
};
