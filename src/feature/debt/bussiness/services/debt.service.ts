import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Debt, DebtDetail, DebtStatus } from 'database/entities';
import { BillingConceptService } from 'feature/billing-concept/bussiness/services';
import { DebtRepository } from 'feature/debt/infraestucture/repository';
import { CreateDebtDto } from 'feature/debt/presentation/dto';
import { EmployeeService } from 'feature/employee/bussiness/services';
import { FatherService } from 'feature/father/Bussines/service';

@Injectable()
export class DebtService { 

  constructor(
    private readonly debtRepository: DebtRepository,
    private readonly fatherService: FatherService,
    private readonly billingConceptService: BillingConceptService,
    private readonly employeeService: EmployeeService,
  ) {}

  public async getAllDebts(paginationDto, fatherId: number) {
    return await this.debtRepository.findAllDebts(paginationDto, fatherId);
  }

  public async createDebt(employeeId: number, createDebtDto: CreateDebtDto): Promise<Debt> {
    const findFather = await this.fatherService.findByIdSelectStudents(createDebtDto.fatherId);
    if (!findFather) {
      throw new NotFoundException("Padre no encontrado");
    }
    const employee = await this.employeeService.findById(employeeId);
    if(!employee){
      throw new NotFoundException("Empleado no encontrado");
    }

    const debtDetails: Array<DebtDetail> = new Array();
    let totalAmount = 0;

    for(const detail of createDebtDto.details){
      const student = findFather.students.find(student => student.id === detail.studentId);
      if(!student){
        throw new NotFoundException(`Estudiante con id ${detail.studentId} no encontrado para el padre`);
      }
      if(!student.isActive){
        throw new BadRequestException(`Estudiante con id ${detail.studentId} no está activo`);
      }
      console.log(student);
      const concept = await this.billingConceptService.findById(detail.conceptId);
      if(!concept){
        throw new NotFoundException(`Concepto producto con el id ${detail.conceptId} no encontrado`);
      }
      if(!concept.isActive){
        throw new BadRequestException(`Concepto producto con el id ${detail.conceptId} no está activo`);
      }
      const debtDetail = new DebtDetail();
      debtDetail.student = student;
      debtDetail.concept = concept;
      const amountNumber = +concept.amount;
      debtDetail.amount = amountNumber;
      totalAmount += amountNumber;
      debtDetails.push(debtDetail);
    }
    
    const debt = new Debt();
    debt.dueDate = new Date(createDebtDto.dueDate);
    debt.description = createDebtDto.description;
    debt.totalAmount = totalAmount;
    debt.totalDebt = totalAmount;
    debt.totalPayment = 0;
    debt.employee = employee;
    debt.details = debtDetails;

    return await this.debtRepository.createDebt(debt);
  }

  public async cancelDebt(debtId: number): Promise<Debt> {
    const debt = await this.debtRepository.findDebtById(debtId);
    if (!debt) {
      throw new NotFoundException(`Deuda con id ${debtId} no encontrada`);
    }
    if (debt.status === DebtStatus.CANCEL) {
      throw new BadRequestException(`No se puede cancelar una deuda cancelada`);
    }
    if (debt.status === DebtStatus.PAID) {
      throw new BadRequestException(`No se puede cancelar una deuda pagada`);
    }
    debt.status = DebtStatus.CANCEL;
    return await this.debtRepository.updateDebt(debt);
  }
}
