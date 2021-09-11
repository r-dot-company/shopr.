import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFile,
    UseInterceptors,
    NotFoundException
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { Auth } from "src/auth/auth.decorator"
import { Role } from "src/role/role.enum"
import { AssetService } from "./asset.service"
import { CreateAssetDTO } from "./dto/create-asset.dto"
import { AssetEntity } from "./entities/asset.entity"

@Controller("asset")
export class AssetController {
    constructor(private assetService: AssetService) {}
    
    @Auth(Role.Admin)
    @Get()
    async getAll() {
        const assets = await this.assetService.getAll()
        return assets.map((asset) => new AssetEntity(asset))
    }

    @Auth(Role.Admin)
    @UseInterceptors(FileInterceptor("file"))
    @Post()
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createAssetDTO: CreateAssetDTO
    ) {
        const asset = await this.assetService.create(createAssetDTO, file)
        return new AssetEntity(asset)
    }

    @Auth(Role.Admin)
    @Delete(":id")
    async delete(@Param("id") id: string) {
        const asset = await this.assetService.findById(id)
        if (!asset) {
            throw new NotFoundException()
        }
        await this.assetService.delete(id)
        return new AssetEntity(asset)
    }
}
