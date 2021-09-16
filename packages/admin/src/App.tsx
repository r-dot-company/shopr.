import { Admin, Resource } from "react-admin"
import { authProvider } from "./authProvider"
import { dataProvider } from "./dataProvider"
import { AdminList } from "./resources/admin"
import { AssetList } from "./resources/asset"
import { AssetTypeList } from "./resources/asset-type"
import { CategoryList } from "./resources/category"
import { OrderList } from "./resources/order"
import { ProductList } from "./resources/product"
import { UserList } from "./resources/user"

export default function App() {
    return (
        <Admin dataProvider={dataProvider} authProvider={authProvider}>
            <Resource name="user" list={UserList}/>
            <Resource name="product" list={ProductList}/>
            <Resource name="category" list={CategoryList}/>
            <Resource name="order" list={OrderList}/>
            <Resource name="asset" list={AssetList}/>
            <Resource name="asset-type" list={AssetTypeList}/>
            <Resource name="admin" list={AdminList}/>
        </Admin>
    )
}
