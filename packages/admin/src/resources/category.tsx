import {
    List,
    Datagrid,
    TextField,
    ArrayField,
    ChipField,
    SingleFieldList,
    SelectInput,
    SelectInputProps,
    useQueryWithStore,
    Loading,
    Error
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

export function CategorySelectInput(props: Omit<SelectInputProps, "choices">) {
    const { loaded, error, data } = useQueryWithStore({
        type: "getList",
        resource: "category",
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
            choices={data.map(({ id, key }: { id: number, key: string }) => ({
                id,
                name: key
            }))}
        />
    )
}
