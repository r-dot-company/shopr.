import { Admin, Resource, ListGuesser } from "react-admin"
import { authProvider } from "./authProvider"
import { dataProvider } from "./dataProvider"

export default function App() {
    return (
        <Admin dataProvider={dataProvider} authProvider={authProvider}>
            <Resource name="product" list={ListGuesser}/>
        </Admin>
    )
}
