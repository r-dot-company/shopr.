import { AssetType } from ".prisma/client"

export class AssetTypeEntity implements AssetType {
    key: string

    mimeType: string

    constructor(assetType: Partial<AssetTypeEntity>) {
        Object.assign(this, assetType)
    }
}
