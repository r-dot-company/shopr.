import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { JWTAuthGuard } from "./guards/jwt-auth.guard"
import { LocalAuthGuard } from "./guards/local-auth.guard"

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Request() req) {
        return this.authService.generateToken(req.user)
    }

    @UseGuards(JWTAuthGuard)
    @Get("/profile")
    async profile(@Request() req) {
        return req.user
    }
}
