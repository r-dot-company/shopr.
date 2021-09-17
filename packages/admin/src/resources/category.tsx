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
    Error,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    ArrayInput,
    SimpleFormIterator
} from "react-admin"

export function CategoryList(props: any) {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
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

export function CategoryEdit(props: any) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput disabled source="id"/>
                <TextInput source="key"/>
                <TextInput source="name"/>
                <ArrayInput source="children">
                    <SimpleFormIterator>
                        <CategorySelectInput source="id"/>
                    </SimpleFormIterator>
                </ArrayInput>
                <ArrayInput source="parents">
                    <SimpleFormIterator>
                        <CategorySelectInput source="id"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    )
}

export function CategoryCreate(props: any) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="key"/>
                <TextInput source="name"/>
                <ArrayInput source="children">
                    <SimpleFormIterator>
                        <CategorySelectInput source="id"/>
                    </SimpleFormIterator>
                </ArrayInput>
                <ArrayInput source="parents">
                    <SimpleFormIterator>
                        <CategorySelectInput source="id"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
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
