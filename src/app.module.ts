import { Module } from "@nestjs/common"
import { PrismaService } from "./prisma/prisma.service"
import { ProductController } from './product/product.controller'

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [PrismaService]
})
export class AppModule {}
