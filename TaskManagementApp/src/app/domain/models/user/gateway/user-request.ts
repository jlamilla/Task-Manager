export interface UserRequest {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}
