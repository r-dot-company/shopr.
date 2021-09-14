import { Module } from "@nestjs/common"
import { AssetAdminController } from "./asset.admin.controller"
import { AssetModule } from "./asset.module"

@Module({
    imports: [AssetModule],
    controllers: [AssetAdminController]
})
export class AssetAdminModule {}
