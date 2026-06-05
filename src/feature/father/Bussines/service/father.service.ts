import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { FatherRepository } from "feature/father/infraestructure/repository";
import { PaginationDto } from "@core/dto";
import { Father } from "@database/entities";
import { PaginatedResult } from "core/interface";
import { CreateFatherDto, UpdateFatherDto } from "feature/father/presentation/dto";

@Injectable()
export class FatherService {
  constructor(
    private readonly fatherRepository: FatherRepository
  ){}

  public async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Father>> {
    return await this.fatherRepository.findAll(paginationDto);
  }

  public async findOne(id: number): Promise<Father | null> {
    const father = await this.fatherRepository.findById(id);
    if(!father){
      throw new NotFoundException("Padre no encontrado");
    }
    return father;
  }

  public async createFather(father: CreateFatherDto): Promise<Father> {
    const findByEmail = await this.fatherRepository.findByEmail(father.email);
    if(findByEmail){
      throw new BadRequestException("Email ya existe");
    }
    const findByPhone = await this.fatherRepository.findByPhone(father.phone);
    if(findByPhone){
      throw new BadRequestException("Teléfono ya existe");
    }
    const newFather = new Father();
    newFather.name = father.name;
    newFather.lastName = father.lastName;
    newFather.email = father.email;
    newFather.phone = father.phone;
    newFather.username = father.username;
    newFather.password = father.password;
    newFather.typeDoc = father.typeDoc || '';
    newFather.document = father.document || '';
    newFather.reasonSocial = father.reasonSocial || '';
    return await this.fatherRepository.createFather(newFather);
  }

  public async updateFather(id: number, father: UpdateFatherDto): Promise<Father> {
    const findFather = await this.fatherRepository.findById(id);
    if(!findFather){
      throw new NotFoundException("Padre no encontrado");
    }

    if(!father.email){
      const findByEmail = await this.fatherRepository.findByEmail(father.email!);
      if(findByEmail && findByEmail.id !== id){
        throw new BadRequestException("Email ya existe");
      }
    }
    if(!father.phone){
      const findByPhone = await this.fatherRepository.findByPhone(father.phone!);
      if(findByPhone && findByPhone.id !== id){
        throw new BadRequestException("Teléfono ya existe");
      }
    }
    findFather.name = father.name || findFather.name;
    findFather.lastName = father.lastName || findFather.lastName;
    findFather.email = father.email || findFather.email;
    findFather.phone = father.phone || findFather.phone;
    findFather.username = father.username || findFather.username;
    findFather.password = father.password || findFather.password;
    findFather.typeDoc = father.typeDoc || findFather.typeDoc || '';
    findFather.document = father.document || findFather.document || '';
    findFather.reasonSocial = father.reasonSocial || findFather.reasonSocial || '';
    return await this.fatherRepository.updateFather(findFather);
  }

  public async deleteFather(id: number): Promise<Father> {
    const findFather = await this.fatherRepository.findById(id);
    if(!findFather){
      throw new NotFoundException("Father not found");
    }
    findFather.isActive = !findFather.isActive; // Eliminación lógica
    return await this.fatherRepository.updateFather(findFather);
  }
}