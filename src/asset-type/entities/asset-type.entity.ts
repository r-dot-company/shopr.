import { AssetType } from ".prisma/client"

export class AssetTypeEntity {
    key: string

    mimeType: string

    constructor(assetType: AssetType) {
        Object.assign(this, assetType)
    }
}
