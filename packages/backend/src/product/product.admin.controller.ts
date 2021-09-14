import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query
} from "@nestjs/common"
import { Auth } from "src/auth/auth.decorator"
import { Role } from "src/role/role.enum"
import { CreateProductDTO } from "./dto/create-product.dto"
import { QueryProductsDTO } from "./dto/query-products.dto"
import { UpdateProductDTO } from "./dto/update-product.dto"
import { ProductEntity } from "./entities/product.entity"
import { ProductService } from "./product.service"

@Controller()
export class ProductAdminController {
    constructor(private readonly productService: ProductService) {}

    @Auth(Role.Admin)
    @Get()
    async getAll(@Query() query: QueryProductsDTO) {
        const products = await this.productService.findAll(query)
        return products.map((product) => new ProductEntity(product))
    }

    @Auth(Role.Admin)
    @Get(":id")
    async getOne(@Param("id", ParseIntPipe) id: number) {
        const product = await this.productService.findById(id)
        if (!product) {
            throw new NotFoundException()
        }
        return new ProductEntity(product)
    }

    @Auth(Role.Admin)
    @Post()
    async create(@Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.create(createProductDTO)
        return new ProductEntity(product)
    }

    @Auth(Role.Admin)
    @Put(":id")
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateProductDTO: UpdateProductDTO
    ) {
        const product = await this.productService.findById(id)
        if (!product) {
            throw new NotFoundException()
        }
        const newProduct = await this.productService.update(id, updateProductDTO)
        return new ProductEntity(newProduct)
    }

    @Auth(Role.Admin)
    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        const product = await this.productService.findById(id)
        if (!product) {
            throw new NotFoundException()
        }
        await this.productService.delete(id)
        return new ProductEntity(product)
    }
}
