import axios, { AxiosRequestConfig } from 'axios';
import { IUser } from "../store/types";
import { Store } from '@reduxjs/toolkit';

export const BASE_URL = "https://prod.wallet.cloudns.ph:8800";
export const REGISTER_PATH = "/acounts/register/";
export const LOGIN_PATH = "/acounts/login/";
export const LOGOUT_PATH = "/acounts/logout/";
export const USER_DETAILS_PATH = "/acounts/get-details/";
export const CHANGE_USER_INFO_PATH = "/acounts/change-info/";
export const CHANGE_USER_PASSWORD_PATH = "/acounts/password-reset-for-login-user/";
export const PASSWORD_RESET_REQUEST_PATH = "/acounts/password-reset-request/";
export const PASSWORD_RESET_CONFIRM_PATH = "/acounts/password-reset-confirm/";
export const WALLET_PATH = "/wallet/";
export const CATEGORY_PATH = "/wallet/category/";
export const TRANSACTION_PATH = "/wallet/transactions/";
export const BANK_DATA_PATH = "/bankdata/";

export const localStorageIsDataEntrySuccess = localStorage.getItem("isDataEntrySuccess")
export const userData = localStorage.getItem('userData');
export const userDataParsed: IUser = JSON.parse(localStorage.getItem('userData'));
export const userId = userDataParsed?.id;
export const token = localStorage.getItem('token');

let store: Store;

export const injectStore = (_store: Store) => {
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
  const userState = store.getState().user;
  let currentToken: string | undefined;

  if (userState?.isAccountDeleted === true || userState?.isLoggedOut === true) {
    currentToken = undefined
  } else {
    currentToken = userState?.user?.token || token
  }

  if (currentToken) {
    config.headers.Authorization = `Token ${currentToken}`;
  }

  return config
});