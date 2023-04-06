export interface IAccount {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
}

export type RegisterSchema = {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  password2: string,
}

export interface IUser {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  password2: string,
}
