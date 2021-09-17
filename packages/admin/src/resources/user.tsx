import {
    List,
    Datagrid,
    TextField,
    DateField,
    BooleanField,
    useRecordContext,
    linkToRecord,
    Show,
    SimpleShowLayout
} from "react-admin"
import { Link } from "react-router-dom"
import { get } from "lodash"

export function UserList(props: any) {
    return (
        <List {...props}>
            <Datagrid rowClick="show">
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

export function UserShow(props: any) {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="id"/>
                <TextField source="email"/>
                <TextField source="firstname"/>
                <TextField source="lastname"/>
                <BooleanField source="admin"/>
                <DateField source="createdAt" showTime/>
                <DateField source="updatedAt" showTime/>
            </SimpleShowLayout>
        </Show>
    )
}

export function UserField(props: any) {
    const record = useRecordContext(props)
    const url = linkToRecord("/user", record.user.id, "show")
    return (
        <Link to={url}>{get(record, props.source)}</Link>
    )
}
