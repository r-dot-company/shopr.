import { Routes } from "@nestjs/core"
import { AdminModule } from "./admin/admin.module"
import { AssetTypeAdminModule } from "./asset-type/asset-type.admin.module"
import { AssetAdminModule } from "./asset/asset.admin.module"
import { OrderAdminModule } from "./order/order.admin.module"
import { ProductAdminModule } from "./product/product.admin.module"
import { UserAdminModule } from "./user/user.admin.module"

export const routes: Routes = [
    {
        path: "admin",
        children: [
            {
                path: "product",
                module: ProductAdminModule
            },
            {
                path: "admin",
                module: AdminModule
            },
            {
                path: "asset",
                module: AssetAdminModule
            },
            {
                path: "asset-type",
                module: AssetTypeAdminModule
            },
            {
                path: "order",
                module: OrderAdminModule
            },
            {
                path: "user",
                module: UserAdminModule
            }
        ]
    }
]
