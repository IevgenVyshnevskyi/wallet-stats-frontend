export interface IUser {
  id?: number,
  first_name: string,
  last_name: string,
  email: string,
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

export type LoginResponse = {
  email: string
}
export interface PasswordRecoveryThreeFormData {
  firstName?: string;
  surname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface DataEntryFormData {
  firstName?: string;
  surname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}