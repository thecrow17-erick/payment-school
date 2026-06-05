import { PaginationDto } from "core/dto";
import { PaginatedResult } from "core/interface";
import { ObjectLiteral, Repository } from "typeorm";
import { SelectQueryBuilder } from "typeorm";

/**
 * Paginates a TypeORM query.
 * Can be used with a Repository or a SelectQueryBuilder.
 * 
 * @param repositoryOrQueryBuilder Repository or SelectQueryBuilder instance
 * @param paginationDto Contains page and limit
 * @returns Paginated result containing data and metadata
 */
export async function paginate<T extends ObjectLiteral>(
  repositoryOrQueryBuilder: Repository<T> | SelectQueryBuilder<T>,
  paginationDto: PaginationDto,
): Promise<PaginatedResult<T>> {
  const page = paginationDto.page && paginationDto.page > 0 ? Number(paginationDto.page) : 1;
  const limit = paginationDto.limit && paginationDto.limit > 0 ? Number(paginationDto.limit) : 10;
  const skip = (page - 1) * limit;

  let data: T[];
  let total: number;

  if (repositoryOrQueryBuilder instanceof Repository) {
    [data, total] = await repositoryOrQueryBuilder.findAndCount({
      skip,
      take: limit,
    });
  } else {
    [data, total] = await repositoryOrQueryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();
  }

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}
