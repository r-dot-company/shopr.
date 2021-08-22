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
    Request
} from "@nestjs/common"
import { Auth } from "src/auth/auth.decorator"
import { CartCountEntity } from "./cart-count.entity"
import { CartProductEntity } from "./cart-product.entity"
import { CartService } from "./cart.service"
import { AddProductDTO } from "./dto/add-product.dto"

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
        const productsInCart = await this.cartService.findByUserAndProduct(
            req.user,
            addProductDTO.productId
        )
        if (productsInCart.length > 0) {
            throw new ConflictException()
        }
        await this.cartService.addProduct(
            req.user,
            addProductDTO
        )
        const count = await this.cartService.countProducts(req.user)
        return new CartCountEntity(count)
    }

    @Auth()
    @Delete(":id")
    async removeProduct(
        @Request() req,
        @Param("id", ParseIntPipe) id: number
    ) {
        const productsInCart = await this.cartService.findByUserAndProduct(
            req.user,
            id
        )
        if (productsInCart.length === 0) {
            throw new NotFoundException()
        }
        await this.cartService.removeProduct(req.user, id)
        const count = await this.cartService.countProducts(req.user)
        return new CartCountEntity(count)
    }
}
