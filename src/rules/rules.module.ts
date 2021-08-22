import { Module } from "@nestjs/common"
import { ProductModule } from "src/product/product.module"
import { ProductExistsRule } from "./product-exists.rule"

@Module({
    imports: [ProductModule],
    providers: [ProductExistsRule]
})
export class RulesModule {}
