import { Injectable } from "@nestjs/common";
import { FatherRepository } from "feature/father/infraestructure/repository";
import { PaginationDto } from "@core/dto";
import { Father } from "@database/entities";
import { PaginatedResult } from "core/interface";

@Injectable()
export class FatherService {
    constructor(
        private readonly fatherRepository: FatherRepository
    ){}

    public findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Father>> {
        return this.fatherRepository.findAll(paginationDto);
    }
}