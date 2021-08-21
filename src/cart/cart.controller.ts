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
import { CartService } from "./cart.service"
import { AddProductDTO } from "./dto/add-product.dto"

@Controller("cart")
export class CartController {
    constructor(private readonly cartService: CartService) {}
    
    @Auth()
    @Get()
    async getCart(@Request() req) {
        const cart = await this.cartService.findByUser(req.user)
        return cart
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
        const cart = await this.cartService.addProduct(
            req.user,
            addProductDTO
        )
        return cart
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
    }
}
