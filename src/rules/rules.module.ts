import { Module } from "@nestjs/common"
import { ProductModule } from "src/product/product.module"
import { UserModule } from "src/user/user.module"
import { EmailAvailableRule } from "./email-available.rule"
import { ProductExistsRule } from "./product-exists.rule"

@Module({
    imports: [ProductModule, UserModule],
    providers: [ProductExistsRule, EmailAvailableRule]
})
export class RulesModule {}
