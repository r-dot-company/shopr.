import { Injectable } from "@nestjs/common"
import { PaginationDTO } from "./dto/pagination.dto";

@Injectable()
export class PaginationService {
    paginate(query: PaginationDTO): {} | {
        skip: number,
        take: number
    } {
        if (
            !query ||
            query.page === undefined ||
            query.per_page === undefined
        ) {
            return {}
        }
        return {
            skip: query.page * query.per_page,
            take: query.per_page
        }
    }
}
