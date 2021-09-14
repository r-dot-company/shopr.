import { OrderStatus } from ".prisma/client"
import { IsIn, IsNotEmpty } from "class-validator"

export class UpdateOrderDTO {
    @IsIn(Object.values(OrderStatus))
    @IsNotEmpty()
    status: OrderStatus
}
