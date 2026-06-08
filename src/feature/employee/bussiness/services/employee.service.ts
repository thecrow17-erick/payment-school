import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from 'database/entities';
import { EmployeeRepository } from 'feature/employee/infraestructure/repository';
import { CreateEmployeeDto, UpdateEmployeeDto } from 'feature/employee/presentation/dto';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  public async findAll(): Promise<Employee[]> {
    return this.employeeRepository.findAll();
  }

  public async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const existing = await this.employeeRepository.findByExternalId(createEmployeeDto.externalId);
    if (existing) {
      throw new BadRequestException(
        `Ya existe un empleado con externalId ${createEmployeeDto.externalId}`,
      );
    }

    const employee = new Employee();
    employee.erpCode = createEmployeeDto.erpCode;
    employee.externalId = createEmployeeDto.externalId;

    return this.employeeRepository.createEmployee(employee);
  }

  public async updateEmployee(externalId: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepository.findByExternalId(externalId);
    if (!employee) {
      throw new NotFoundException(`Empleado con externalId ${externalId} no encontrado`);
    }

    if (
      updateEmployeeDto.externalId !== undefined &&
      updateEmployeeDto.externalId !== externalId
    ) {
      const conflict = await this.employeeRepository.findByExternalId(updateEmployeeDto.externalId);
      if (conflict) {
        throw new BadRequestException(
          `Ya existe un empleado con externalId ${updateEmployeeDto.externalId}`,
        );
      }
    }

    employee.erpCode = updateEmployeeDto.erpCode ?? employee.erpCode;
    employee.externalId = updateEmployeeDto.externalId ?? employee.externalId;
    employee.isActive = updateEmployeeDto.isActive !== undefined ? updateEmployeeDto.isActive : employee.isActive;

    return this.employeeRepository.updateEmployee(employee);
  }

  public async findByExternalId(externalId: number): Promise<Employee> {
    const employee = await this.employeeRepository.findByExternalId(externalId);
    if (!employee) {
      throw new NotFoundException(`Empleado con externalId ${externalId} no encontrado`);
    }
    return employee;
  }
}
