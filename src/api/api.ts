import axios from 'axios';

import { IUser } from "../store/types";

export const BASE_URL = "http://localhost:8000";

export const REGISTER_PATH = "/acounts/register/";
export const LOGIN_PATH = "/acounts/login/";
export const LOGOUT_PATH = "/acounts/logout/";
export const USER_DETAILS_PATH = "/acounts/get-details/";

export const WALLET_PATH = "/wallet/";
export const CATEGORY_PATH = "/wallet/category/";
export const TRANSACTION_PATH = "/wallet/transactions/";

export const userData = localStorage.getItem('userData');
export const userDataParsed: IUser = JSON.parse(localStorage.getItem('userData'));
export const userId = userDataParsed?.id;

export const token = localStorage.getItem('token');
const authHeader = token ? { "Authorization": `Token ${token}` } : {};

export const $api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...authHeader,
  }
});

export const $apiNoToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});