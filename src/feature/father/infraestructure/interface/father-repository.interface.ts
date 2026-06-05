import { Father } from "@database/entities";
import { PaginationDto, PaginatedResult } from "@core/dto";


export interface FatherRepositoryInterface {
    findById(id: number): Promise<Father | null>;
    findByName(name: string): Promise<Father | null>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Father>>;
    createFather(father: Father): Promise<Father>;
}