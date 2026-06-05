import { Father } from "@database/entities";
import { PaginationDto } from "@core/dto";
import { PaginatedResult } from "core/interface";


export interface FatherRepositoryInterface {
    findById(id: number): Promise<Father | null>;
    findByName(name: string): Promise<Father | null>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Father>>;
    createFather(father: Father): Promise<Father>;
    findByEmail(email: string): Promise<Father | null>;
    findByPhone(phone: string): Promise<Father | null>;
    findByUsername(username: string): Promise<Father | null>;
    updateFather(father: Father): Promise<Father>;
}