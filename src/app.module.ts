import { ClassSerializerInterceptor, Module } from "@nestjs/common"
import { APP_INTERCEPTOR } from "@nestjs/core"
import { AddressModule } from "./address/address.module"
import { AuthModule } from "./auth/auth.module"
import { CartModule } from "./cart/cart.module"
import { ProductModule } from "./product/product.module"
import { UserModule } from "./user/user.module"

@Module({
    imports: [
        AuthModule,
        ProductModule,
        UserModule,
        AddressModule,
        CartModule
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor
        }
    ]
})
export class AppModule {}
