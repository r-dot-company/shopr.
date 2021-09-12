import { Access } from ".prisma/client"
import {
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
} from "@nestjs/common"
import { ProductEntity } from "./entities/product.entity"
import { ProductService } from "./product.service"

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAll() {
        const products = await this.productService.findAllPublic()
        return products.map((product) => new ProductEntity(product))
    }

    @Get(":id")
    async getOne(@Param("id", ParseIntPipe) id: number) {
        const product = await this.productService.findById(id)
        if (!product || product.access === Access.PRIVATE) {
            throw new NotFoundException()
        }
        return new ProductEntity(product)
    }
}
