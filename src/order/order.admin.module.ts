import { Module } from "@nestjs/common"
import { OrderAdminController } from "./order.admin.controller"
import { OrderModule } from "./order.module"

@Module({
    imports: [OrderModule],
    controllers: [OrderAdminController]
})
export class OrderAdminModule {}
