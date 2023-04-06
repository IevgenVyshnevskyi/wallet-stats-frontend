import axios from 'axios';

import { LOCAL_STORAGE_USER_KEY } from '../consts/localStorage';

export const $api = axios.create({
  baseURL: __API_URL__,
  headers: {
    authorization: localStorage.getItem(LOCAL_STORAGE_USER_KEY)
  }
});