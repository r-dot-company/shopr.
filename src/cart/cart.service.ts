import { Injectable } from "@nestjs/common"
import { User } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"
import { AddProductDTO } from "./dto/add-product.dto"

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) {}

    async findByUser(user: User) {
        return await this.prisma.productInCart.findMany({
            where: {
                userId: user.id
            },
            include: {
                product: true
            }
        })
    }

    async findByUserAndProduct(user: User, productId: number) {
        return this.prisma.productInCart.findMany({
            where: {
                userId: user.id,
                productId
            }
        })
    }

    async countProducts(user: User) {
        return await this.prisma.productInCart.count({
            where: {
                userId: user.id
            }
        })
    }

    async addProduct(user: User, addProductDTO: AddProductDTO) {
        return await this.prisma.productInCart.create({
            data: {
                amount: addProductDTO.amount,
                productId: addProductDTO.productId,
                userId: user.id
            }
        })
    }

    async removeProduct(user: User, productId: number) {
        return await this.prisma.productInCart.deleteMany({
            where: {
                userId: user.id,
                productId
            }
        })
    }
}
