export interface IUser {
  id?: number,
  first_name: string,
  last_name: string,
  email?: string,
  is_confirm_email?: boolean,
  token?: string;
}

export type UserState = {
  user: IUser;
  isLoading: boolean;
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  isRegistered: boolean;
  isAccountDeleted: boolean;
  isProfileChanged: boolean;
  isPasswordChanged: boolean;
  loginError: string | null;
  logoutError: string | null;
  getDetailsError: string | null;
  registerError: string | null;
  deleteUserAccountError: string | null;
  confirmEmailError: string | null;
  profileChangeError: string | null;
  passwordChangeError: string | null;
}

export type RegisterFormData = {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  password2: string,
}

export type LoginFormData = {
  email: string,
  password: string,
}

export interface DataEntryFormData {
  availableCash: string;
  cardAccountName: string;
  amountAccount: string;
  userId?: number;
}

export interface PasswordChangeFormData {
  old_password: string;
  new_password: string;
  new_password_2: string;
}