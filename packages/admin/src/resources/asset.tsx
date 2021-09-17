import { useEffect } from "react"
import {
    List,
    Datagrid,
    TextField,
    useRecordContext,
    Create,
    SimpleForm,
    FileInput,
    TextInput,
    FileField,
    useQueryWithStore,
    Loading,
    Error
} from "react-admin"
import { useFormState } from "react-final-form"
import { makeURL } from "../api"
import { AssetTypeSelect } from "./asset-type"

const IMAGE_EXTENSIONS = [".jpeg", ".jpg", ".png", ".gif"]

export function AssetList(props: any) {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="filename"/>
                <TextField source="type.key" label="Type"/>
                <TextField source="product.name" label="Product"/>
                <AssetPreviewField source="filename" label="Preview"/>
            </Datagrid>
        </List>
    )
}

export function AssetCreate(props: any) {
    return (
        <Create {...props}>
            <SimpleForm>
                <AssetTypeSelect source="type.key" label="Type"/>
                <TextInput source="product.id"/>
                <AssetFileInput source="file">
                    <FileField source="src" title="title"/>
                </AssetFileInput>
            </SimpleForm>
        </Create>
    )
}

function AssetPreviewField(props: any) {
    const { source } = props
    const record = useRecordContext(props)
    const filename: string = record[source]
    const url = makeURL(`storage/${filename}`)

    if (IMAGE_EXTENSIONS.some((ext) => filename.endsWith(ext))) {
        return (
            <img src={url} alt="Preview" width={100}/>
        )
    }

    return (
        <a download href={url}>Download</a>
    )
}

function AssetFileInput(props: any) {
    const { values } = useFormState()

    const { loaded, error, data } = useQueryWithStore({
        type: "getOne",
        resource: "asset-type",
        payload: {
            id: values.type?.key
        }
    })

    if (!values.type) {
        return <></>
    }

    if (!loaded) {
        return <Loading/>
    }

    if (error) {
        return <Error error={error}/>
    }

    return (
        <FileInput {...props} accept={data.mimeType}>
            {props.children}
        </FileInput>
    )
}
