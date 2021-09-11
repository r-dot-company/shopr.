import { Injectable } from "@nestjs/common"
import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator"
import { AssetTypeService } from "src/asset-type/asset-type.service"

@ValidatorConstraint({
    name: "AssetTypeExists",
    async: true
})
@Injectable()
export class AssetTypeExistsRule implements ValidatorConstraintInterface {
    constructor(private readonly assetTypeService: AssetTypeService) {}

    async validate(key: string) {
        if (!key) {
            return false
        }
        const assetType = await this.assetTypeService.findByKey(key)
        return !!assetType
    }
    
    defaultMessage() {
        return "Asset-Type does not exist"
    }
}
