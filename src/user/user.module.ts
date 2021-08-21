import { Module } from "@nestjs/common"
import { AuthModule } from "src/auth/auth.module"
import { CryptoModule } from "src/crypto/crypto.module"
import { PrismaService } from "src/prisma/prisma.service"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"

@Module({
    imports: [AuthModule, CryptoModule],
    providers: [PrismaService, UserService],
    controllers: [UserController]
})
export class UserModule {}
