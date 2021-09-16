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
    BadRequestException,
    Query
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { Auth } from "src/auth/auth.decorator"
import { ContentRangeInterceptor } from "src/pagination/content-range.interceptor"
import { PaginationDTO } from "src/pagination/dto/pagination.dto"
import { Role } from "src/role/role.enum"
import { AssetService } from "./asset.service"
import { CreateAssetDTO } from "./dto/create-asset.dto"
import { AssetEntity } from "./entities/asset.entity"

@Controller()
@Auth(Role.Admin)
export class AssetAdminController {
    constructor(private assetService: AssetService) {}

    @Get()
    @UseInterceptors(ContentRangeInterceptor)
    async getAll(@Query() query: PaginationDTO) {
        const size = await this.assetService.getSize()
        const assets = await this.assetService.getAll(query)
        return [size, assets.map((asset) => new AssetEntity(asset))]
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
