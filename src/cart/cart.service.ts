import { Injectable } from "@nestjs/common"
import { User } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"
import { AddProductDTO } from "./dto/add-product.dto"
import { UpdateProductDTO } from "./dto/update-product.dto"

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) {}

    async findByUser(user: User) {
        return await this.prisma.cartProduct.findMany({
            where: {
                userId: user.id
            },
            include: {
                product: true
            }
        })
    }

    async findByUserAndProduct(user: User, productId: number) {
        const cartProducts = await this.prisma.cartProduct.findMany({
            where: {
                userId: user.id,
                productId
            }
        })
        return cartProducts[0]
    }

    async countProducts(user: User) {
        return await this.prisma.cartProduct.count({
            where: {
                userId: user.id
            }
        })
    }

    async addProduct(user: User, addProductDTO: AddProductDTO) {
        await this.prisma.cartProduct.create({
            data: {
                amount: addProductDTO.amount,
                productId: addProductDTO.productId,
                userId: user.id
            }
        })
        return await this.countProducts(user)
    }

    async updateProduct(
        user: User,
        productId: number,
        updateProductDTO: UpdateProductDTO
    ) {
        await this.prisma.cartProduct.updateMany({
            where: {
                userId: user.id,
                productId
            },
            data: updateProductDTO
        })
        return await this.findByUserAndProduct(user, productId)
    }

    async removeProduct(user: User, productId: number) {
        await this.prisma.cartProduct.deleteMany({
            where: {
                userId: user.id,
                productId
            }
        })
        return await this.countProducts(user)
    }
}
