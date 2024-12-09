export interface AuthUser {
  email: string;
  email_verified: boolean;
  ["http://localhost:8000/roles"]: string[];
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}
