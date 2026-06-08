


export interface EmployeeResponseAdapterInterface {
  employee: EmployeeInterface | null;
  message: string;
  isSuccess: boolean;
}


export interface EmployeeInterface {
  id: number;
  erpCode: string;
  name: string;
  email: string;
  role: string;
  passwordHash: string;
}