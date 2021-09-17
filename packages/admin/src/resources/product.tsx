import {
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField,
    ArrayField,
    SingleFieldList,
    ChipField,
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    Create,
    ArrayInput,
    SimpleFormIterator
} from "react-admin"
import { AccessSelectInput } from "../components/AccessSelectInput"
import { CategorySelectInput } from "./category"

export function ProductList(props: any) {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id"/>
                <TextField source="name"/>
                <NumberField source="price"/>
                <TextField source="access"/>
                <ArrayField source="categories">
                    <SingleFieldList>
                        <ChipField source="name"/>
                    </SingleFieldList>
                </ArrayField>
                <ArrayField source="assets">
                    <Datagrid>
                        <TextField source="filename"/>
                        <TextField source="type.key" label="Type"/>
                    </Datagrid>
                </ArrayField>
                <DateField source="createdAt" showTime/>
                <DateField source="updatedAt" showTime/>
            </Datagrid>
        </List>
    )
}

export function ProductEdit(props: any) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput disabled source="id"/>
                <TextInput source="name"/>
                <NumberInput source="price"/>
                <AccessSelectInput source="access"/>
                <ArrayInput source="categories">
                    <SimpleFormIterator>
                        <CategorySelectInput source="id"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    )
}

export function ProductCreate(props: any) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name"/>
                <NumberInput source="price"/>
                <AccessSelectInput source="access"/>
                <ArrayInput source="categories">
                    <SimpleFormIterator>
                        <CategorySelectInput source="id"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    )
}
