import { Module } from "@nestjs/common"
import { AssetTypeModule } from "src/asset-type/asset-type.module"
import { StorageModule } from "src/storage/storage.module"
import { AssetService } from "./asset.service"

@Module({
    imports: [StorageModule, AssetTypeModule],
    providers: [AssetService],
    exports: [AssetService]
})
export class AssetModule {}
