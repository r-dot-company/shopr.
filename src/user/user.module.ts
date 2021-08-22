import { Module } from "@nestjs/common"
import { CryptoModule } from "src/crypto/crypto.module"
import { PrismaService } from "src/prisma/prisma.service"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"

@Module({
    imports: [CryptoModule],
    providers: [PrismaService, UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
