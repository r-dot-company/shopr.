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
    Put
} from "@nestjs/common"
import { User } from ".prisma/client"
import { Auth } from "src/auth/auth.decorator"
import { CartCountEntity } from "./entities/cart-count.entity"
import { CartProductEntity } from "./entities/cart-product.entity"
import { CartService } from "./cart.service"
import { AddProductDTO } from "./dto/add-product.dto"
import { UpdateProductDTO } from "./dto/update-product.dto"
import { AuthUser } from "src/auth/auth-user.decorator"

@Controller("cart")
@Auth()
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    async getCart(@AuthUser() user: User) {
        const cart = await this.cartService.findByUser(user)
        return cart.map((cartProduct) => new CartProductEntity(cartProduct))
    }

    @Post()
    async addProduct(
        @AuthUser() user: User,
        @Body() addProductDTO: AddProductDTO
    ) {
        const cartProduct = await this.cartService.findByUserAndProduct(
            user,
            addProductDTO.productId
        )
        if (cartProduct) {
            throw new ConflictException()
        }
        const count = await this.cartService.addProduct(user, addProductDTO)
        return new CartCountEntity(count)
    }

    @Put(":id")
    async updateProduct(
        @AuthUser() user: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateProductDTO: UpdateProductDTO
    ) {
        const cartProduct = await this.cartService.findByUserAndProduct(user, id)
        if (!cartProduct) {
            throw new NotFoundException()
        }
        const newCartProduct = await this.cartService.updateProduct(user, id, updateProductDTO)
        return new CartProductEntity(newCartProduct)
    }

    @Delete(":id")
    async removeProduct(
        @AuthUser() user: User,
        @Param("id", ParseIntPipe) id: number
    ) {
        const cartProduct = await this.cartService.findByUserAndProduct(user, id)
        if (!cartProduct) {
            throw new NotFoundException()
        }
        const count = await this.cartService.removeProduct(user, id)
        return new CartCountEntity(count)
    }
}
