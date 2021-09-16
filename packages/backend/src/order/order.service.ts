import { CartProduct, Prisma, Product, User } from ".prisma/client"
import { Injectable } from "@nestjs/common"
import { PaginationDTO } from "src/pagination/dto/pagination.dto"
import { PaginationService } from "src/pagination/pagination.service"
import { PrismaService } from "src/prisma/prisma.service"
import { UpdateOrderDTO } from "./dto/update-order.dto"

@Injectable()
export class OrderService {
    private readonly include = {
        products: {
            include: {
                product: true
            }
        }
    }

    constructor(private prisma: PrismaService, private paginationService: PaginationService) {}

    async getSize() {
        return this.prisma.order.count()
    }

    async getAll(query?: PaginationDTO) {
        return this.prisma.order.findMany({
            ...this.paginationService.paginate(query),
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
        const cartProducts = await this.prisma.cartProduct.findMany({
            where: { user },
            include: {
                product: true
            }
        })
        if (!cartProducts.length) {
            return null
        }
        const order = await this.prisma.order.create({
            data: {
                userId: user.id,
                total: this.calculateTotal(cartProducts)
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

    private calculateTotal(cartProducts: (CartProduct & { product: Product })[]) {
        return cartProducts.reduce((total, cartProduct) => {
            const { price } = cartProduct.product
            const amount = new Prisma.Decimal(cartProduct.amount)
            return total.add(price.mul(amount))
        }, new Prisma.Decimal(0))
    }
}
