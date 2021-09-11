import { ClassSerializerInterceptor, Module } from "@nestjs/common"
import { APP_INTERCEPTOR } from "@nestjs/core"
import { MulterModule } from "@nestjs/platform-express"
import { AddressModule } from "./address/address.module"
import { AssetTypeModule } from "./asset-type/asset-type.module"
import { AssetModule } from "./asset/asset.module"
import { AuthModule } from "./auth/auth.module"
import { CartModule } from "./cart/cart.module"
import { OrderModule } from "./order/order.module"
import { PrismaModule } from "./prisma/prisma.module"
import { ProductModule } from "./product/product.module"
import { RulesModule } from "./rules/rules.module"
import { StorageModule } from "./storage/storage.module"
import { UserModule } from "./user/user.module"

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        RulesModule,
        MulterModule.register({
            limits: {
                fileSize: 5 * 1e6 // 5MB
            }
        }),
        ProductModule,
        UserModule,
        AddressModule,
        CartModule,
        OrderModule,
        AssetTypeModule,
        AssetModule,
        StorageModule
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor
        }
    ]
})
export class AppModule {}
