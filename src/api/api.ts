import axios from 'axios';

import { LOCAL_STORAGE_USER_KEY } from '../consts/localStorage';

export const BASE_URL = "http://localhost:8000";
export const REGISTRAION_PATH = "/acounts/register/";
export const LOGIN_PATH = "/acounts/login/";
export const WALLET_PATH = "/wallet/";
export const CATEGORY_PATH = "/wallet/category/";
export const TRANSACTION_PATH = "/wallet/transactions/";

const token = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
const authHeader = token ? { authorization: `Bearer ${token}` } : {};

// export const $api = axios.create({
//   baseURL: __API_URL__,
//   headers: {
//     ...authHeader
//   }
// });