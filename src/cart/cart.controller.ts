import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Request
} from "@nestjs/common"
import { Auth } from "src/auth/auth.decorator"
import { CartCountEntity } from "./cart-count.entity"
import { CartProductEntity } from "./cart-product.entity"
import { CartService } from "./cart.service"
import { AddProductDTO } from "./dto/add-product.dto"
import { UpdateProductDTO } from "./dto/update-product.dto"

@Controller("cart")
export class CartController {
    constructor(private readonly cartService: CartService) {}
    
    @Auth()
    @Get()
    async getCart(@Request() req) {
        const cart = await this.cartService.findByUser(req.user)
        return cart.map((cartProduct) => new CartProductEntity(cartProduct))
    }

    @Auth()
    @Post()
    async addProduct(
        @Request() req,
        @Body() addProductDTO: AddProductDTO
    ) {
        const cartProduct = await this.cartService.findByUserAndProduct(
            req.user,
            addProductDTO.productId
        )
        if (cartProduct) {
            throw new ConflictException()
        }
        const count = await this.cartService.addProduct(
            req.user,
            addProductDTO
        )
        return new CartCountEntity(count)
    }

    @Auth()
    @Put(":id")
    async updateProduct(
        @Request() req,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateProductDTO: UpdateProductDTO
    ) {
        const cartProduct = await this.cartService.findByUserAndProduct(
            req.user,
            id
        )
        if (!cartProduct) {
            throw new NotFoundException()
        }
        const newCartProduct = await this.cartService.updateProduct(
            req.user,
            id,
            updateProductDTO
        )
        return new CartProductEntity(newCartProduct)
    }

    @Auth()
    @Delete(":id")
    async removeProduct(
        @Request() req,
        @Param("id", ParseIntPipe) id: number
    ) {
        const cartProduct = await this.cartService.findByUserAndProduct(
            req.user,
            id
        )
        if (!cartProduct) {
            throw new NotFoundException()
        }
        const count = await this.cartService.removeProduct(req.user, id)
        return new CartCountEntity(count)
    }
}
