import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common"
import { Response } from "express"
import { map } from "rxjs"

export class ContentRangeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            map(([size, data]: [number, any]) => {
                const res = context.switchToHttp().getResponse<Response>()
                res.header("Content-Range", `items */${size}`)
                return data
            })
        )
    }
}
