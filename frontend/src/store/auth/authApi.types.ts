export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CheckEmailRequest {
  email: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: User;
}
