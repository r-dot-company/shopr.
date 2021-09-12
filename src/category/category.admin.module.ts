import { Module } from "@nestjs/common"
import { CategoryAdminController } from "./category.admin.controller"
import { CategoryModule } from "./category.module"

@Module({
    imports: [CategoryModule],
    controllers: [CategoryAdminController]
})
export class CategoryAdminModule {}
