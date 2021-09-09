import { OrderStatus } from ".prisma/client"
import { IsNotEmpty, Validate } from "class-validator"
import { OneOfRule } from "src/rules/one-of.rule"

export class UpdateOrderDTO {
    @Validate(OneOfRule, [Object.values(OrderStatus)])
    @IsNotEmpty()
    status: OrderStatus
}
