import { ClassSerializerInterceptor, Module } from "@nestjs/common"
import { APP_INTERCEPTOR } from "@nestjs/core"
import { AddressModule } from "./address/address.module"
import { AuthModule } from "./auth/auth.module"
import { CartModule } from "./cart/cart.module"
import { OrderModule } from "./order/order.module"
import { ProductModule } from "./product/product.module"
import { RulesModule } from "./rules/rules.module"
import { UserModule } from "./user/user.module"

@Module({
    imports: [
        AuthModule,
        RulesModule,
        ProductModule,
        UserModule,
        AddressModule,
        CartModule,
        OrderModule
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor
        }
    ]
})
export class AppModule {}
