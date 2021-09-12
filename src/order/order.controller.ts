import {
    ConflictException,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post
} from "@nestjs/common"
import { User } from ".prisma/client"
import { AuthUser } from "src/auth/auth-user.decorator"
import { Auth } from "src/auth/auth.decorator"
import { OrderEntity } from "./entities/order.entity"
import { OrderService } from "./order.service"

@Controller("order")
@Auth()
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get()
    async getAll(@AuthUser() user: User) {
        const orders = await this.orderService.findByUser(user)
        return orders.map((order) => new OrderEntity(order))
    }

    @Get(":id")
    async getOne(@AuthUser() user: User, @Param("id") id: string) {
        const order = await this.orderService.findById(id)
        if (!order || order.userId !== user.id) {
            throw new NotFoundException()
        }
        return new OrderEntity(order)
    }

    @Post("/submit")
    async submitOrder(@AuthUser() user: User) {
        const order = await this.orderService.submit(user)
        if (!order) {
            throw new ConflictException()
        }
        return new OrderEntity(order)
    }
}
