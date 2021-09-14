import { AssetType } from ".prisma/client"
import { Expose } from "class-transformer"
import { Role } from "src/role/role.enum"

export class AssetTypeEntity implements AssetType {
    key: string

    @Expose({ groups: [Role.Admin] })
    mimeType: string

    constructor(assetType: Partial<AssetTypeEntity>) {
        Object.assign(this, assetType)
    }
}
