import {
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField,
    ArrayField,
    SingleFieldList,
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    Create,
    ArrayInput,
    SimpleFormIterator,
    useRecordContext,
    linkToRecord,
    EditButton
} from "react-admin"
import { Link } from "react-router-dom"
import { get } from "lodash"
import { AccessSelectInput } from "../components/AccessSelectInput"
import { CategoryField, CategorySelectInput } from "./category"

export function ProductList(props: any) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="name"/>
                <NumberField source="price"/>
                <TextField source="access"/>
                <ArrayField source="categories">
                    <SingleFieldList linkType={false}>
                        <CategoryField source="name"/>
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
                <EditButton/>
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

export function ProductField(props: any) {
    const record = useRecordContext(props)
    const url = linkToRecord("/product", record.product.id, "edit")
    return (
        <Link to={url}>{get(record, props.source)}</Link>
    )
}
