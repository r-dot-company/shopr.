import { Module } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { AddressController } from "./address.controller"
import { AddressService } from "./address.service"

@Module({
    controllers: [AddressController],
    providers: [PrismaService, AddressService]
})
export class AddressModule {}
