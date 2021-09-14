import { OmitType, PartialType } from "@nestjs/mapped-types"
import { CreateAssetTypeDTO } from "./create-asset-type.dto"

export class UpdateAssetTypeDTO extends PartialType(
    OmitType(CreateAssetTypeDTO, ["key"])
) {}
