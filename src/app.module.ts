import { ClassSerializerInterceptor, Module } from "@nestjs/common"
import { APP_INTERCEPTOR, RouterModule } from "@nestjs/core"
import { MulterModule } from "@nestjs/platform-express"
import { AddressModule } from "./address/address.module"
import { AdminModule } from "./admin/admin.module"
import { AssetTypeAdminModule } from "./asset-type/asset-type.admin.module"
import { AssetTypeModule } from "./asset-type/asset-type.module"
import { AssetAdminModule } from "./asset/asset.admin.module"
import { AssetModule } from "./asset/asset.module"
import { AuthModule } from "./auth/auth.module"
import { CartModule } from "./cart/cart.module"
import { CategoryAdminModule } from "./category/category.admin.module"
import { CategoryModule } from "./category/category.module"
import { OrderAdminModule } from "./order/order.admin.module"
import { OrderModule } from "./order/order.module"
import { PrismaModule } from "./prisma/prisma.module"
import { ProductAdminModule } from "./product/product.admin.module"
import { ProductModule } from "./product/product.module"
import { routes } from "./routes"
import { RulesModule } from "./rules/rules.module"
import { StorageModule } from "./storage/storage.module"
import { UserAdminModule } from "./user/user.admin.module"
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
        RouterModule.register(routes),
        ProductModule,
        ProductAdminModule,
        UserModule,
        UserAdminModule,
        AddressModule,
        CartModule,
        OrderModule,
        OrderAdminModule,
        AssetTypeModule,
        AssetTypeAdminModule,
        AssetModule,
        AssetAdminModule,
        StorageModule,
        AdminModule,
        CategoryModule,
        CategoryAdminModule
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor
        }
    ]
})
export class AppModule {}
