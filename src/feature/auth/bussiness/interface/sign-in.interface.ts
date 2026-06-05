import { Father } from "@database/entities";



export interface SignInResponse {
  token: string;
  father: Father;
}