import { Body, Controller, Get, Post } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateProductDTO } from "./create-product.dto"

@Controller("product")
export class ProductController {
    constructor(private readonly prisma: PrismaService) {}

    @Get()
    async getAllProducts() {
        const products = await this.prisma.product.findMany()
        return products
    }

    @Post()
    async createProduct(@Body() createProductDTO: CreateProductDTO) {
        await this.prisma.product.create({
            data: createProductDTO
        })
    }
}
