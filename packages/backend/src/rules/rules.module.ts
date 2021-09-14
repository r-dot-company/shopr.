import { Module } from "@nestjs/common"
import { AssetTypeModule } from "src/asset-type/asset-type.module"
import { CategoryModule } from "src/category/category.module"
import { ProductModule } from "src/product/product.module"
import { UserModule } from "src/user/user.module"
import { AssetTypeExistsRule } from "./asset-type-exists.rule"
import { CategoryExistsRule } from "./category-exists.rule"
import { EmailAvailableRule } from "./email-available.rule"
import { ProductExistsRule } from "./product-exists.rule"
import { UserExistsRule } from "./user-exists.rule"

@Module({
    imports: [
        ProductModule,
        UserModule,
        AssetTypeModule,
        CategoryModule
    ],
    providers: [
        ProductExistsRule,
        EmailAvailableRule,
        AssetTypeExistsRule,
        UserExistsRule,
        CategoryExistsRule
    ]
})
export class RulesModule {}
