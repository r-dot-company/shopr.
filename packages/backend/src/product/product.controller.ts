import { Access } from ".prisma/client"
import {
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Query    
} from "@nestjs/common"
import { QueryProductsDTO } from "./dto/query-products.dto"
import { ProductEntity } from "./entities/product.entity"
import { ProductService } from "./product.service"

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAll(@Query() query: QueryProductsDTO) {
        const products = await this.productService.findAllPublic(query)
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
