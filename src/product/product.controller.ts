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

    @UseGuards(JWTAuthGuard)
    @Post()
    async create(@Body() createProductDTO: CreateProductDTO) {
        await this.productService.create(createProductDTO)
    }

    @UseGuards(JWTAuthGuard)
    @Put(":id")
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateProductDTO: UpdateProductDTO
    ) {
        await this.productService.update(id, updateProductDTO)
    }

    @UseGuards(JWTAuthGuard)
    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        await this.productService.delete(id)
    }
}
