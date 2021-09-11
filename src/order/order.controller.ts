import {
    Body,
    ConflictException,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Request,
} from "@nestjs/common"
import { User } from ".prisma/client"
import { AuthUser } from "src/auth/auth-user.decorator"
import { Auth } from "src/auth/auth.decorator"
import { Role } from "src/role/role.enum"
import { UpdateOrderDTO } from "./dto/update-order.dto"
import { OrderEntity } from "./entities/order.entity"
import { OrderService } from "./order.service"

@Controller("order")
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Auth()
    @Get()
    async getOrders(@AuthUser() user: User) {
        const orders = await this.orderService.findByUser(user)
        return orders.map((order) => new OrderEntity(order))
    }

    @Auth()
    @Get(":id")
    async getOrder(@AuthUser() user: User, @Param("id") id: string) {
        const order = await this.orderService.findById(id)
        if (!order || order.userId !== user.id) {
            throw new NotFoundException()
        }
        return new OrderEntity(order)
    }

    @Auth()
    @Post("/submit")
    async submitOrder(@AuthUser() user: User) {
        const order = await this.orderService.submit(user)
        if (!order) {
            throw new ConflictException()
        }
        return new OrderEntity(order)
    }

    @Auth(Role.Admin)
    @Put(":id")
    async updateOrder(
        @AuthUser() user: User,
        @Param("id") id: string,
        @Body() updateOrderDTO: UpdateOrderDTO
    ) {
        const order = await this.orderService.findById(id)
        if (!order || order.userId !== user.id) {
            throw new NotFoundException()
        }
        const newOrder = await this.orderService.update(id, updateOrderDTO)
        return new OrderEntity(newOrder)
    }
}
