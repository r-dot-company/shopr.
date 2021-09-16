import {
    List,
    Datagrid,
    TextField,
    ArrayField,
    ChipField,
    SingleFieldList
} from "react-admin"

export function CategoryList(props: any) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="key"/>
                <TextField source="name"/>
                <ArrayField source="children">
                    <SingleFieldList>
                        <ChipField source="name"/>
                    </SingleFieldList>
                </ArrayField>
                <ArrayField source="parents">
                    <SingleFieldList>
                        <ChipField source="name"/>
                    </SingleFieldList>
                </ArrayField>
            </Datagrid>
        </List>
    )
}
