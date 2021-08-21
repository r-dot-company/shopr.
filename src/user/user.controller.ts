import {
    Body,
    Controller,
    Delete,
    Post,
    Put,
    Request,
    UseGuards
} from "@nestjs/common"
import { JWTAuthGuard } from "src/auth/guards/jwt-auth.guard"
import { TakenException } from "src/exceptions/taken.exception"
import { CreateUserDTO } from "./dto/create-user.dto"
import { UpdateUserDTO } from "./dto/update-user.dto"
import { UserService } from "./user.service"

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() creatUserDTO: CreateUserDTO) {
        const existingUser = await this.userService.findByEmail(creatUserDTO.email)
        if (existingUser) {
            throw new TakenException("Email")
        }
        await this.userService.create(creatUserDTO)
    }

    @UseGuards(JWTAuthGuard)
    @Put()
    async update(@Request() req, @Body() updateUserDTO: UpdateUserDTO) {
        await this.userService.update(req.user.id, updateUserDTO)
    }

    @UseGuards(JWTAuthGuard)
    @Delete()
    async delete(@Request() req) {
        await this.userService.delete(req.user.id)
    }
}
