import { Module } from "@nestjs/common"
import { ProductModule } from "./product.module"
import { ProductAdminController } from "./product.admin.controller"

@Module({
    imports: [ProductModule],
    controllers: [ProductAdminController]
})
export class ProductAdminModule {}
