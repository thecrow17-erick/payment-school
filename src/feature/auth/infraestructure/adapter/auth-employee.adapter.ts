import { Inject, Injectable } from "@nestjs/common";
import { EmployeeAdapterInterface } from "../interface";
import { ClientProxy } from "@nestjs/microservices";
import { SERVICE_NAME } from "@core/rabbitMQ/const";
import { EmployeeResponseAdapterInterface } from "feature/auth/bussiness/interface";
import { firstValueFrom } from "rxjs";


@Injectable()
export class EmployeeAuthAdapter implements EmployeeAdapterInterface {
  constructor(
    @Inject(SERVICE_NAME.EMPLOYEE_SERVICE) private client: ClientProxy
  ) {}

  public async validateToken(token: string): Promise<EmployeeResponseAdapterInterface> {
    const payload = { token };
    const response: EmployeeResponseAdapterInterface = await firstValueFrom(
      this.client.send('handleValidateToken', payload)
    );
    return response;
  }

}