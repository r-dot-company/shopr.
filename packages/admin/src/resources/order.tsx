import {
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField,
    ArrayField,
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    ArrayInput,
    SimpleFormIterator
} from "react-admin"
import { OrderStatusInput } from "../components/OrderStatusInput"

export function OrderList(props: any) {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
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

export function OrderEdit(props: any) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput disabled source="id"/>
                <OrderStatusInput source="status"/>
                <NumberInput disabled source="total"/>
                <ArrayInput disabled source="products">
                    <SimpleFormIterator>
                        <NumberInput disabled source="amount"/>
                        <TextInput disbaled source="product.name" label="Product"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    )
}
