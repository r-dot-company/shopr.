import { OmitType, PartialType } from "@nestjs/mapped-types"
import { AddProductDTO } from "./add-product.dto"

export class UpdateProductDTO extends PartialType(
    OmitType(AddProductDTO, ["productId"])
) {}
