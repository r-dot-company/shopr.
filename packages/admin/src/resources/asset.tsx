import {
    List,
    Datagrid,
    TextField
} from "react-admin"

export function AssetList(props: any) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="filename"/>
                <TextField source="type.key" label="Type"/>
                <TextField source="product.name" label="Product"/>
            </Datagrid>
        </List>
    )
}
