import { Module } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { AdminService } from "./admin.service"

@Module({
    providers: [PrismaService, AdminService],
    exports: [AdminService]
})
export class AdminModule {}
