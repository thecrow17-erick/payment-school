import { Employee } from 'database/entities';

export interface EmployeeRepositoryInterface {
  findAll(): Promise<Employee[]>;
  createEmployee(employee: Employee): Promise<Employee>;
  updateEmployee(employee: Employee): Promise<Employee>;
  findByExternalId(externalId: number): Promise<Employee | null>;
}
