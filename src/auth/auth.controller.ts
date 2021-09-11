import { User } from ".prisma/client"
import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common"
import { UserEntity } from "src/user/entities/user.entity"
import { AuthUser } from "./auth-user.decorator"
import { AuthService } from "./auth.service"
import { JWTAuthGuard } from "./guards/jwt-auth.guard"
import { LocalAuthGuard } from "./guards/local-auth.guard"

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@AuthUser() user: User) {
        return this.authService.generateToken(user)
    }

    @UseGuards(JWTAuthGuard)
    @Get("/profile")
    async profile(@AuthUser() user: User) {
        return new UserEntity(user)
    }
}
