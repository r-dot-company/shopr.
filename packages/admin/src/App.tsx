import { Admin, Resource } from "react-admin"
import { authProvider } from "./authProvider"
import { dataProvider } from "./dataProvider"
import { AdminList } from "./resources/admin"
import { AssetCreate, AssetList } from "./resources/asset"
import { AssetTypeList } from "./resources/asset-type"
import { CategoryCreate, CategoryEdit, CategoryList } from "./resources/category"
import { OrderEdit, OrderList } from "./resources/order"
import { ProductCreate, ProductEdit, ProductList } from "./resources/product"
import { UserList } from "./resources/user"

export default function App() {
    return (
        <Admin dataProvider={dataProvider} authProvider={authProvider}>
            <Resource name="user" list={UserList}/>
            <Resource name="product" list={ProductList} edit={ProductEdit} create={ProductCreate}/>
            <Resource name="category" list={CategoryList} edit={CategoryEdit} create={CategoryCreate}/>
            <Resource name="order" list={OrderList} edit={OrderEdit}/>
            <Resource name="asset" list={AssetList} create={AssetCreate}/>
            <Resource name="asset-type" list={AssetTypeList}/>
            <Resource name="admin" list={AdminList}/>
        </Admin>
    )
}
