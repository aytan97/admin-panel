import axios from "axios";
import qs from "qs";
import AppConsts from "../../library/appconsts";
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseInterceptor,
  responseErrorInterceptor,
} from "./interceptors";

const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  headers: {
    "Content-Type": "application/json",
    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWRmMzM3MDk3YjQ2ODljZWFiYTMzNjciLCJpYXQiOjE3MDk5ODA1OTUsImV4cCI6MTcxMTcwODU5NX0.xoqZAHtyFKWqyW5pIR-JIbAIttLcC3_hNwqMK9im-bQ"
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { encode: false });
  },
});

http.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
http.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default http;
