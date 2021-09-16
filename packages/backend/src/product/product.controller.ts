import { Access } from ".prisma/client"
import {
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Query,    
    UseInterceptors
} from "@nestjs/common"
import { ContentRangeInterceptor } from "src/pagination/content-range.interceptor"
import { QueryProductsDTO } from "./dto/query-products.dto"
import { ProductEntity } from "./entities/product.entity"
import { ProductService } from "./product.service"

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @UseInterceptors(ContentRangeInterceptor)
    async getAll(@Query() query: QueryProductsDTO) {
        const size = await this.productService.getSizePublic()
        const products = await this.productService.findAllPublic(query)
        return [size, products.map((product) => new ProductEntity(product))]
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
