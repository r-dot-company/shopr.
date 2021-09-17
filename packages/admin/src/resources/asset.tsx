import {
    List,
    Datagrid,
    TextField,
    useRecordContext,
    Create,
    SimpleForm,
    FileInput,
    TextInput,
    FileField
} from "react-admin"
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
                <FileInput source="file">
                    <FileField source="src" title="title"/>
                </FileInput>
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
