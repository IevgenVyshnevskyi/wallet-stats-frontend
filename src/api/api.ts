import axios, { AxiosRequestConfig } from 'axios';

import { IUser } from "../store/types";

export const BASE_URL = "http://129.153.197.29:8000";
export const REGISTER_PATH = "/acounts/register/";
export const LOGIN_PATH = "/acounts/login/";
export const LOGOUT_PATH = "/acounts/logout/";
export const USER_DETAILS_PATH = "/acounts/get-details/";
export const WALLET_PATH = "/wallet/";
export const CATEGORY_PATH = "/wallet/category/";
export const TRANSACTION_PATH = "/wallet/transactions/";

export const localStorageIsDataEntrySuccess = localStorage.getItem("isDataEntrySuccess")
export const userData = localStorage.getItem('userData');
export const userDataParsed: IUser = JSON.parse(localStorage.getItem('userData'));
export const userId = userDataParsed?.id;

export const token = localStorage.getItem('token');

let store: any;

export const injectStore = (_store: any) => {
  store = _store
}

export const $api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

$api.interceptors.request.use((config: AxiosRequestConfig): any => {
  const currentToken = store.getState().user?.user?.token || token;

  if (currentToken) {
    config.headers.Authorization = `Token ${currentToken}`;
  }

  return config
});