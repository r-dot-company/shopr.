import { ClassSerializerInterceptor, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
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
import { configSchema } from "./config/config.schema"
import { OrderAdminModule } from "./order/order.admin.module"
import { OrderModule } from "./order/order.module"
import { PaginationModule } from "./pagination/pagination.module"
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
        ConfigModule.forRoot({
            validationSchema: configSchema,
            isGlobal: true,
            cache: true
        }),
        MulterModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                limits: {
                    fileSize: configService.get<number>("MAX_UPLOAD_FILE_SIZE_MB") / 1e6
                }
            })
        }),
        RouterModule.register(routes),
        PrismaModule,
        PaginationModule,
        AuthModule,
        RulesModule,
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
