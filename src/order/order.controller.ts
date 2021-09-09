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
import { Auth } from "src/auth/auth.decorator"
import { Role } from "src/role/role.enum"
import { UpdateOrderDTO } from "./dto/update-order.dto"
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
        const order = await this.orderService.submit(req.user)
        if (!order) {
            throw new ConflictException()
        }
        return new OrderEntity(order)
    }

    @Auth(Role.Admin)
    @Put(":id")
    async updateOrder(
        @Request() req,
        @Param("id") id: string,
        @Body() updateOrderDTO: UpdateOrderDTO
    ) {
        const order = await this.orderService.findById(id)
        if (!order || order.userId !== req.user.id) {
            throw new NotFoundException()
        }
        const newOrder = await this.orderService.update(id, updateOrderDTO)
        return new OrderEntity(newOrder)
    }
}
