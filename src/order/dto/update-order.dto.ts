import { OrderStatus } from ".prisma/client"
import { IsNotEmpty } from "class-validator"
import { OneOf } from "src/rules/decorators"

export class UpdateOrderDTO {
    @OneOf(Object.values(OrderStatus))
    @IsNotEmpty()
    status: OrderStatus
}
