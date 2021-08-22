import { Injectable } from "@nestjs/common"
import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator"
import { UserService } from "src/user/user.service"

@ValidatorConstraint({
    name: "EmailAvailable",
    async: true
})
@Injectable()
export class EmailAvailableRule implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(email: string) {
        const user = await this.userService.findByEmail(email)
        return !user
    }

    defaultMessage() {
        return "Email is already taken"
    }
}
