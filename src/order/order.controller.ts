import {
    ConflictException,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Request,
} from "@nestjs/common"
import { Auth } from "src/auth/auth.decorator"
import { OrderEntity } from "./order.entity"
import { OrderService } from "./order.service"

@Controller("order")
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Auth()
    @Get()
    async getOrders(@Request() req) {
        const orders = await this.orderService.findByUser(req.user)
        return orders.map((order) => new OrderEntity(order))
    }

    @Auth()
    @Get(":id")
    async getOrder(@Request() req, @Param("id") id: string) {
        const order = await this.orderService.findById(id)
        if (!order || order.userId !== req.user.id) {
            throw new NotFoundException()
        }
        return new OrderEntity(order)
    }

    @Auth()
    @Post("/submit")
    async submitOrder(@Request() req) {
        const order = await this.orderService.submitOrder(req.user)
        if (!order) {
            throw new ConflictException()
        }
        return new OrderEntity(order)
    }
}
