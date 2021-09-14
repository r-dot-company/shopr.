import { IntersectionType, PickType } from "@nestjs/mapped-types"
import { PaginationDTO } from "src/pagination/dto/pagination.dto"
import { CreateProductDTO } from "./create-product.dto"

export class QueryProductsDTO extends IntersectionType(
    PaginationDTO,
    PickType(CreateProductDTO, ["categories"])
) {}
