import { Injectable } from "@nestjs/common"
import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator"
import { UserService } from "src/user/user.service"

@ValidatorConstraint({
    name: "UserExists",
    async: true
})
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(id: string) {
        if (!id) {
            return false
        }
        const user = await this.userService.findById(id)
        return !!user
    }
    
    defaultMessage() {
        return "User does not exist"
    }
}
