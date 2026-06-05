import { FatherRepositoryInterface } from "../interface/father-repository.interface";
import { Repository } from "typeorm";
import { Father } from "@database/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDto } from "@core/dto";
import { PaginatedResult } from "core/interface";
import { paginate } from "core/util/paginate.util";

@Injectable()
export class FatherRepository implements FatherRepositoryInterface {

    constructor(
        @InjectRepository(Father)
        private readonly repository: Repository<Father>
    ){}

    public findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Father>> {
        const queryBuilder = this.repository.createQueryBuilder('father');

        if (paginationDto.search) {
            const searchPattern = `%${paginationDto.search}%`;
            queryBuilder.where(
                '(father.name ILIKE :search OR father.lastName ILIKE :search OR father.email ILIKE :search OR father.document ILIKE :search)',
                { search: searchPattern }
            );
        }

        return paginate(queryBuilder, paginationDto);
    }
    public findById(id: number): Promise<Father | null> {
        return this.repository.findOne({ where: { id } });
    }

    public findByName(name: string): Promise<Father | null> {
        return this.repository.findOne({ where: { name } });
    }
    
    public createFather(father: Father): Promise<Father> {
        const newFather = this.repository.create(father);
        return this.repository.save(newFather);
    }
}