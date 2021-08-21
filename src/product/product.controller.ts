import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common"
import { JWTAuthGuard } from "src/auth/guards/jwt-auth.guard"
import { CreateProductDTO } from "./dto/create-product.dto"
import { UpdateProductDTO } from "./dto/update-product.dto"
import { ProductEntity } from "./product.entity"
import { ProductService } from "./product.service"

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAll() {
        const products = await this.productService.findAll()
        return products.map((product) => new ProductEntity(product))
    }

    @Get(":id")
    async getOne(@Param("id", ParseIntPipe) id: number) {
        const product = await this.productService.findById(id)
        return new ProductEntity(product)
    }

    @UseGuards(JWTAuthGuard)
    @Post()
    async create(@Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.create(createProductDTO)
        return new ProductEntity(product)
    }

    @UseGuards(JWTAuthGuard)
    @Put(":id")
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateProductDTO: UpdateProductDTO
    ) {
        const product = await this.productService.update(id, updateProductDTO)
        return new ProductEntity(product)
    }

    @UseGuards(JWTAuthGuard)
    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        const product = await this.productService.delete(id)
        return new ProductEntity(product)
    }
}
