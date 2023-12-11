import axios from "axios"
import { apiKey } from "./ApiManager"

export default function NetworkManager(
  url: string,
  method = "get",
  params = {}
) {
  return axios({
    url: url,
    method: method,
    params: params,
    responseType: "json",
    headers: {
      Authorization: apiKey,
    },
  })
}

export enum HttpMethod {
  get = "get",
  post = "post",
}
