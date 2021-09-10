import { Module } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { AssetTypeController } from "./asset-type.controller"
import { AssetTypeService } from "./asset-type.service"

@Module({
    controllers: [AssetTypeController],
    providers: [PrismaService, AssetTypeService]
})
export class AssetTypeModule {}
