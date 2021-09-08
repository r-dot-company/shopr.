import { User } from ".prisma/client"
import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) {}

    async findByUser(user: User) {
        return this.prisma.order.findMany({
            where: { user },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })
    }

    async findById(id: string) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })
    }

    async submitOrder(user: User) {
        const productsInCart = await this.prisma.cartProduct.findMany({
            where: { user }
        })
        if (!productsInCart.length) {
            return null
        }
        const order = await this.prisma.order.create({
            data: {
                userId: user.id
            }
        })
        await this.prisma.cartProduct.updateMany({
            where: { user },
            data: {
                userId: null,
                orderId: order.id
            }
        })
        return await this.findById(order.id)
    }
}
