import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Put
} from "@nestjs/common"
import { User } from ".prisma/client"
import { AuthUser } from "src/auth/auth-user.decorator"
import { Auth } from "src/auth/auth.decorator"
import { Role } from "src/role/role.enum"
import { UpdateOrderDTO } from "./dto/update-order.dto"
import { OrderEntity } from "./entities/order.entity"
import { OrderService } from "./order.service"

@Controller()
@Auth(Role.Admin)
export class OrderAdminController {
    constructor(private orderService: OrderService) {}

    @Get()
    async getAll() {
        const orders = await this.orderService.getAll()
        return orders.map((order) => new OrderEntity(order))
    }

    @Get(":id")
    async getOne(@Param("id") id: string) {
        const order = await this.orderService.findById(id, true)
        if (!order) {
            throw new NotFoundException()
        }
        return new OrderEntity(order)
    }

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
