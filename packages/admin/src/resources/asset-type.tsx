import {
    List,
    Datagrid,
    TextField,
    SelectInput,
    useQueryWithStore,
    Loading,
    Error,
    SelectInputProps,
    Edit,
    Create,
    SimpleForm,
    TextInput
} from "react-admin"

export function AssetTypeList(props: any) {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="key"/>
                <TextField source="mimeType"/>
            </Datagrid>
        </List>
    )
}

export function AssetTypeEdit(props: any) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput disabled source="key"/>
                <CommaSeperatedTextInput source="mimeType"/>
            </SimpleForm>
        </Edit>
    )
}

export function AssetTypeCreate(props: any) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="key"/>
                <CommaSeperatedTextInput source="mimeType"/>
            </SimpleForm>
        </Create>
    )
}

export function CommaSeperatedTextInput(props: any) {
    return (
        <TextInput
            {...props}
            helperText="Seperate multiple values with a comma (e.g. 'image/png,image/jpeg')"
        />
    )
}

export function AssetTypeSelect(props: Omit<SelectInputProps, "choices">) {
    const { loaded, error, data } = useQueryWithStore({
        type: "getList",
        resource: "asset-type",
        payload: {
            pagination: {
                page: 1,
                per_page: 100
            }
        }
    })

    if (!loaded) {
        return <Loading/>
    }

    if (error) {
        return <Error error={error}/>
    }

    return (
        <SelectInput
            {...props}
            choices={data.map(({ key }: { key: string }) => ({
                id: key,
                name: key
            }))}
        />
    )
}
