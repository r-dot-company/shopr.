import {
    List,
    Datagrid,
    TextField
} from "react-admin"

export function AssetTypeList(props: any) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="key"/>
                <TextField source="mimeType"/>
            </Datagrid>
        </List>
    )
}
