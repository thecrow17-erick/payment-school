import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { EmployeeAuthAdapter } from 'feature/auth/infraestructure/adapter';
import { EmployeeService } from 'feature/employee/bussiness/services';

@Injectable()
export class EmployeeAuthGuard implements CanActivate {
  constructor(
    private readonly employeeAuthAdapter: EmployeeAuthAdapter,
    private readonly employeeService: EmployeeService
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    let token: string = "";
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    if (!token) {
      throw new NotFoundException('Token no encontrado');
    }
    const response = await this.employeeAuthAdapter.validateToken(token);
    if(!response.isSuccess){
      throw new UnauthorizedException('Token inválido o expirado');
    }
    const findOrCreateEmployee = await this.employeeService.findByExternalIdOrCreate(response.employee!.id, {
      erpCode: response.employee!.erpCode,
      externalId: response.employee!.id,
    });
    if(!findOrCreateEmployee.isActive){
      await this.employeeService.updateIsActive(findOrCreateEmployee.externalId, false);
      throw new UnauthorizedException('Empleado no está activo');
    }else{
      await this.employeeService.updateIsActive(findOrCreateEmployee.externalId, true);
    }
    request.employeeId = findOrCreateEmployee.id;
    return true;
  }
}
