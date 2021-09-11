import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFile,
    UseInterceptors,
    NotFoundException,
    BadRequestException
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { Auth } from "src/auth/auth.decorator"
import { Role } from "src/role/role.enum"
import { AssetService } from "./asset.service"
import { CreateAssetDTO } from "./dto/create-asset.dto"
import { AssetEntity } from "./entities/asset.entity"

@Controller("asset")
@Auth(Role.Admin)
export class AssetController {
    constructor(private assetService: AssetService) {}

    @Get()
    async getAll() {
        const assets = await this.assetService.getAll()
        return assets.map((asset) => new AssetEntity(asset))
    }

    @UseInterceptors(FileInterceptor("file"))
    @Post()
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createAssetDTO: CreateAssetDTO
    ) {
        const asset = await this.assetService.create(createAssetDTO, file)
        if (!asset) {
            throw new BadRequestException()
        }
        return new AssetEntity(asset)
    }

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
