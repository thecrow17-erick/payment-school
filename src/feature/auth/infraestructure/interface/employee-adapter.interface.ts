import { EmployeeResponseAdapterInterface } from "feature/auth/bussiness/interface";


export interface EmployeeAdapterInterface {
  validateToken(token: string): Promise<EmployeeResponseAdapterInterface>;
}