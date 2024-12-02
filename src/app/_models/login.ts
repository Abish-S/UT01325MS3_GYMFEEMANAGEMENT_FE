export interface loginRequest {
  username: string;
  password: string;
}
export interface loginResponse {
  success: boolean;
  token: string;
  isAdmin: boolean;
}
