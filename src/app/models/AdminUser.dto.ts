import { TokenResponse } from './TokenResponse';

export interface AdminUser {
  email: string;
  tokenResponse?: TokenResponse;
}