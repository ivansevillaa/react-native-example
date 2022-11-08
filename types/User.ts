export interface UserDataRequest {
  email: string;
  password: string;
}

export interface User {
  id_usuario: string;
  email: string;
  password: string;
  nickname: string;
  dni: string;
}
