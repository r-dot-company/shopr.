import { AssetType } from ".prisma/client"
import { Injectable } from "@nestjs/common"
import { AssetTypeService } from "src/asset-type/asset-type.service"
import { PrismaService } from "src/prisma/prisma.service"
import { StorageService } from "src/storage/storage.service"
import { CreateAssetDTO } from "./dto/create-asset.dto"

@Injectable()
export class AssetService {
    constructor(
        private prisma: PrismaService,
        private storage: StorageService,
        private assetTypeService: AssetTypeService
    ) {}

    async getAll() {
        return this.prisma.asset.findMany({
            include: {
                type: {
                    select: {
                        key: true
                    }
                },
                product: {
                    select: {
                        name: true
                    }
                }
            }
        })
    }

    async create(createAssetDTO: CreateAssetDTO, file: Express.Multer.File) {
        const assetType = await this.assetTypeService.findByKey(createAssetDTO.typeKey)
        const isValidFile = this.validateFile(file, assetType)
        if (!isValidFile) {
            return null
        }
        const filename = await this.storage.storeUploadedFile(file)
        return await this.prisma.asset.create({
            data: {
                filename,
                typeKey: createAssetDTO.typeKey,
                productId: parseInt(createAssetDTO.productId)
            }
        })
    }

    private validateFile(file: Express.Multer.File, assetType: AssetType) {
        const validMimeTypes = this.assetTypeService.getMimeTypes(assetType)
        return validMimeTypes.includes(file.mimetype)
    }
}
