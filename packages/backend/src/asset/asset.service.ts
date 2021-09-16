import { AssetType } from ".prisma/client"
import { Injectable } from "@nestjs/common"
import { AssetTypeService } from "src/asset-type/asset-type.service"
import { PaginationDTO } from "src/pagination/dto/pagination.dto"
import { PaginationService } from "src/pagination/pagination.service"
import { PrismaService } from "src/prisma/prisma.service"
import { StorageService } from "src/storage/storage.service"
import { CreateAssetDTO } from "./dto/create-asset.dto"

@Injectable()
export class AssetService {
    private readonly include = {
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

    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
        private storage: StorageService,
        private assetTypeService: AssetTypeService
    ) {}

    async getSize() {
        return this.prisma.asset.count()
    }

    async getAll(query?: PaginationDTO) {
        return this.prisma.asset.findMany({
            ...this.paginationService.paginate(query),
            include: this.include
        })
    }

    async findById(id: string) {
        return this.prisma.asset.findUnique({
            where: { id },
            include: this.include
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

    async delete(id: string) {
        const asset = await this.findById(id)
        await this.storage.delete(asset.filename)
        return await this.prisma.asset.delete({
            where: { id }
        }) 
    }

    private validateFile(file: Express.Multer.File, assetType: AssetType) {
        const validMimeTypes = this.assetTypeService.getMimeTypes(assetType)
        return validMimeTypes.includes(file.mimetype)
    }
}
