export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

export interface JwtUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}
