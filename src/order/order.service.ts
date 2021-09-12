import { Prisma, User } from ".prisma/client"
import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { UpdateOrderDTO } from "./dto/update-order.dto"

@Injectable()
export class OrderService {
    private readonly include: Prisma.OrderInclude = {
        products: {
            include: {
                product: true
            }
        }
    }

    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.order.findMany({
            include: {
                ...this.include,
                user: true
            }
        })
    }

    async findByUser(user: User) {
        return this.prisma.order.findMany({
            where: { user },
            include: this.include
        })
    }

    async findById(id: string, includeUser = false) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                ...this.include,
                user: includeUser
            }
        })
    }

    async submit(user: User) {
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

    async update(id: string, updateOrderDTO: UpdateOrderDTO) {
        return await this.prisma.order.update({
            where: { id },
            data: updateOrderDTO
        })
    }
}
