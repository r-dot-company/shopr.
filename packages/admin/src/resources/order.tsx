import {
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField,
    ArrayField
} from "react-admin"

export function OrderList(props: any) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="status"/>
                <NumberField source="total"/>
                <TextField source="user.id"/>
                <ArrayField source="products">
                    <Datagrid>
                        <NumberField source="amount"/>
                        <TextField source="product.name" label="Product"/>
                    </Datagrid>
                </ArrayField>
                <DateField source="createdAt" showTime/>
                <DateField source="updatedAt" showTime/>
            </Datagrid>
        </List>
    )
}
