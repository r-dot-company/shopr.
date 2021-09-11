import { Module } from "@nestjs/common"
import { AssetTypeModule } from "src/asset-type/asset-type.module"
import { ProductModule } from "src/product/product.module"
import { UserModule } from "src/user/user.module"
import { AssetTypeExistsRule } from "./asset-type-exists.rule"
import { EmailAvailableRule } from "./email-available.rule"
import { ProductExistsRule } from "./product-exists.rule"

@Module({
    imports: [ProductModule, UserModule, AssetTypeModule],
    providers: [ProductExistsRule, EmailAvailableRule, AssetTypeExistsRule]
})
export class RulesModule {}
