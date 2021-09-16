import {
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField,
    ArrayField,
    SingleFieldList,
    ChipField
} from "react-admin"

export function ProductList(props: any) {
    return (
        <List {...props}>
            <Datagrid>
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
