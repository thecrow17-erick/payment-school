export interface AuthRepositoryInterface {
  comparePassword(password: string, hash: string): Promise<boolean>;
  generateToken<T extends object>(payload: T): Promise<string>;
  tokenDecode<T extends object>(token: string): Promise<T | null>;
}