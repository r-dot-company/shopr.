import { applyDecorators, SerializeOptions, UseGuards } from "@nestjs/common"
import { Role } from "src/role/role.enum"
import { RequireRole } from "src/role/roles.decorator"
import { JWTAuthGuard } from "./guards/jwt-auth.guard"

export const Auth = (role?: Role) => applyDecorators(
    RequireRole(role),
    SerializeOptions({
        groups: [role]
    }),
    UseGuards(JWTAuthGuard)
)
