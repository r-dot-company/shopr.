import { Module } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { ProductController } from "./product.controller"
import { ProductService } from "./product.service"

@Module({
    controllers: [ProductController],
    providers: [PrismaService, ProductService]
})
export class ProductModule {}
