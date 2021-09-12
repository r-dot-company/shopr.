import { Module } from "@nestjs/common"
import { AssetTypeAdminController } from "./asset-type.admin.controller"
import { AssetTypeModule } from "./asset-type.module"

@Module({
    imports: [AssetTypeModule],
    controllers: [AssetTypeAdminController]
})
export class AssetTypeAdminModule {}
