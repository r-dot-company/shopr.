import {
    List,
    Datagrid,
    TextField,
    DateField,
    BooleanField
} from "react-admin"

export function UserList(props: any) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="email"/>
                <TextField source="firstname"/>
                <TextField source="lastname"/>
                <BooleanField source="admin"/>
                <DateField source="createdAt" showTime/>
                <DateField source="updatedAt" showTime/>
            </Datagrid>
        </List>
    )
}
