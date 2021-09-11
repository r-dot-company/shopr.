import { AssetType } from ".prisma/client"

export class AssetTypeEntity {
    key: string

    mimeType: string

    constructor(assetType: Partial<AssetType>) {
        Object.assign(this, assetType)
    }
}
