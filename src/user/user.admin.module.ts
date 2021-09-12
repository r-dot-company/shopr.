import { Module } from "@nestjs/common"
import { UserAdminController } from "./user.admin.controller"
import { UserModule } from "./user.module"

@Module({
    imports: [UserModule],
    controllers: [UserAdminController]
})
export class UserAdminModule {}
