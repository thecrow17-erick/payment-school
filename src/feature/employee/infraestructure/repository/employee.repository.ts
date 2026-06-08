import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'database/entities';
import { Repository } from 'typeorm';
import { EmployeeRepositoryInterface } from '../interface';

@Injectable()
export class EmployeeRepository implements EmployeeRepositoryInterface {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) {}

  public async findAll(): Promise<Employee[]> {
    return this.repository.find();
  }

  public async createEmployee(employee: Employee): Promise<Employee> {
    const newEmployee = this.repository.create(employee);
    return this.repository.save(newEmployee);
  }

  public async updateEmployee(employee: Employee): Promise<Employee> {
    return this.repository.save(employee);
  }

  public async findByExternalId(externalId: number): Promise<Employee | null> {
    return this.repository.findOne({ where: { externalId } });
  }
  public async findById(id: number): Promise<Employee | null> {
    return this.repository.findOne({ where: { id } });
  }
}
