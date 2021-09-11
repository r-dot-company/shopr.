import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put
} from "@nestjs/common"
import { Auth } from "src/auth/auth.decorator"
import { Role } from "src/role/role.enum"
import { AssetTypeService } from "./asset-type.service"
import { CreateAssetTypeDTO } from "./dto/create-asset-type.dto"
import { UpdateAssetTypeDTO } from "./dto/update-asset-type.dto"
import { AssetTypeEntity } from "./entities/asset-type.entity"

@Controller("asset-type")
@Auth(Role.Admin)
export class AssetTypeController {
    constructor(private assetTypeService: AssetTypeService) {}

    @Get()
    async getAll() {
        const assetTypes = await this.assetTypeService.getAll()
        return assetTypes.map((assetType) => new AssetTypeEntity(assetType))
    }

    @Post()
    async create(@Body() createAssetTypeDTO: CreateAssetTypeDTO) {
        const existingAssetType = await this.assetTypeService.findByKey(
            createAssetTypeDTO.key
        )
        if (existingAssetType) {
            throw new ConflictException()
        }
        const assetType = await this.assetTypeService.create(createAssetTypeDTO)
        return new AssetTypeEntity(assetType)
    }

    @Put(":key")
    async update(
        @Param("key") key: string,
        @Body() updateAssetTypeDTO: UpdateAssetTypeDTO
    ) {
        const assetType = await this.assetTypeService.findByKey(key)
        if (!assetType) {
            throw new NotFoundException()
        }
        const newAssetType = await this.assetTypeService.update(key, updateAssetTypeDTO)
        return new AssetTypeEntity(newAssetType)
    }

    @Delete(":key")
    async delete(@Param("key") key: string) {
        const assetType = await this.assetTypeService.findByKey(key)
        if (!assetType) {
            throw new NotFoundException()
        }
        await this.assetTypeService.delete(key)
        return new AssetTypeEntity(assetType)
    }
}
