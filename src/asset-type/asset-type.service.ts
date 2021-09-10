import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateAssetTypeDTO } from "./dto/create-asset-type.dto"
import { UpdateAssetTypeDTO } from "./dto/update-asset-type.dto"

@Injectable()
export class AssetTypeService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        return this.prisma.assetType.findMany()
    }

    async findByKey(key: string) {
        return this.prisma.assetType.findUnique({
            where: { key }
        })
    }

    async create(createAssetTypeDTO: CreateAssetTypeDTO) {
        return await this.prisma.assetType.create({
            data: createAssetTypeDTO
        })
    }

    async update(key: string, updateAssetTypeDTO: UpdateAssetTypeDTO) {
        return await this.prisma.assetType.update({
            where: { key },
            data: updateAssetTypeDTO
        })
    }

    async delete(key: string) {
        return await this.prisma.assetType.delete({
            where: { key }
        })
    }
}
