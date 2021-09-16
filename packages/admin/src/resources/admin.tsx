import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    DateField
} from "react-admin"

export function AdminList(props: any) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id"/>
                <BooleanField source="protected"/>
                <DateField source="createdAt" showTime/>
                <DateField source="updatedAt" showTime/>
            </Datagrid>
        </List>
    )
}
