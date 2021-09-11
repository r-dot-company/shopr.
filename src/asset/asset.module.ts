import { Module } from "@nestjs/common"
import { AssetTypeModule } from "src/asset-type/asset-type.module"
import { StorageModule } from "src/storage/storage.module"
import { AssetController } from "./asset.controller"
import { AssetService } from "./asset.service"

@Module({
    imports: [StorageModule, AssetTypeModule],
    controllers: [AssetController],
    providers: [AssetService]
})
export class AssetModule {}
