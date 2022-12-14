export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  email: string;
  name: string;
  password: string;
  password2: string;
}

export interface UserLocalStorage {
  id: string;
  name: string;
  email: string;
  token: string;
}
