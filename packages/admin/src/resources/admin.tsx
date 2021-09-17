import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    DateField,
    Create,
    SimpleForm,
    TextInput
} from "react-admin"
import { UserField } from "./user"

export function AdminList(props: any) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id"/>
                <UserField source="user.id"/>
                <BooleanField source="protected"/>
                <DateField source="createdAt" showTime/>
                <DateField source="updatedAt" showTime/>
            </Datagrid>
        </List>
    )
}

export function AdminCreate(props: any) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="user.id"/>
            </SimpleForm>
        </Create>
    )
}
