import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common"
import { CreateProductDTO } from "./dto/create-product.dto"
import { UpdateProductDTO } from "./dto/update-product.dto"
import { ProductService } from "./product.service"

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAll() {
        return await this.productService.findAll()
    }

    @Get(":id")
    async getOne(@Param("id", ParseIntPipe) id: number) {
        return await this.productService.findById(id)
    }

    @Post()
    async create(@Body() createProductDTO: CreateProductDTO) {
        await this.productService.create(createProductDTO)
    }

    @Put(":id")
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateProductDTO: UpdateProductDTO
    ) {
        await this.productService.update(id, updateProductDTO)
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        await this.productService.delete(id)
    }
}
