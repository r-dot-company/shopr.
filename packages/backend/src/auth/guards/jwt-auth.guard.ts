import { ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { AuthGuard } from "@nestjs/passport"
import { Role } from "src/role/role.enum"
import { ROLE_KEY } from "src/role/roles.decorator"

@Injectable()
export class JWTAuthGuard extends AuthGuard("jwt") {
    constructor(private readonly reflector: Reflector) {
        super()
    }
    
    async canActivate(context: ExecutionContext) {
        const isValidToken = await super.canActivate(context)
        if (!isValidToken) {
            return false
        }
        const requiredRole = this.reflector.getAllAndOverride<Role>(
            ROLE_KEY,
            [context.getHandler(), context.getClass()]
        )
        if (!requiredRole) {
            return true
        }
        const { user } = context.switchToHttp().getRequest()
        if (requiredRole === Role.Admin && !user.admin) {
            return false
        }
        return true
    }
}
