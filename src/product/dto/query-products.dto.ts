import { PickType } from "@nestjs/mapped-types"
import { CreateProductDTO } from "./create-product.dto"

export class QueryProductsDTO extends PickType(CreateProductDTO, ["categories"]) {}
