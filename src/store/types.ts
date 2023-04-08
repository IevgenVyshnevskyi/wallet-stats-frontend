/* USER */

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

