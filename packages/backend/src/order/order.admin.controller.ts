import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Put,
    Query,
    UseInterceptors
} from "@nestjs/common"
import { User } from ".prisma/client"
import { AuthUser } from "src/auth/auth-user.decorator"
import { Auth } from "src/auth/auth.decorator"
import { Role } from "src/role/role.enum"
import { UpdateOrderDTO } from "./dto/update-order.dto"
import { OrderEntity } from "./entities/order.entity"
import { OrderService } from "./order.service"
import { PaginationDTO } from "src/pagination/dto/pagination.dto"
import { ContentRangeInterceptor } from "src/pagination/content-range.interceptor"

@Controller()
@Auth(Role.Admin)
export class OrderAdminController {
    constructor(private orderService: OrderService) {}

    @Get()
    @UseInterceptors(ContentRangeInterceptor)
    async getAll(@Query() query: PaginationDTO) {
        const size = await this.orderService.getSize()
        const orders = await this.orderService.getAll(query)
        return [size, orders.map((order) => new OrderEntity(order))]
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
        @Param("id") id: string,
        @Body() updateOrderDTO: UpdateOrderDTO
    ) {
        const order = await this.orderService.findById(id)
        if (!order) {
            throw new NotFoundException()
        }
        const newOrder = await this.orderService.update(id, updateOrderDTO)
        return new OrderEntity(newOrder)
    }

    @Delete(":id")
    async deleteOrder(@Param("id") id: string) {
        const order = await this.orderService.findById(id)
        if (!order) {
            throw new NotFoundException()
        }
        await this.orderService.delete(id)
        return new OrderEntity(order)
    }
}
