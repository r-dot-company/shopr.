import {
    List,
    Datagrid,
    TextField,
    SelectInput,
    useQueryWithStore,
    Loading,
    Error,
    SelectInputProps
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
