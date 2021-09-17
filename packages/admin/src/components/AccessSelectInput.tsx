import { SelectInput, SelectInputProps } from "react-admin"
import { API } from "../api"

export function AccessSelectInput(props: Omit<SelectInputProps, "choices">) {
    return (
        <SelectInput
            {...props}
            choices={Object.values(API.Access).map((key) => ({
                id: key,
                name: key
            }))}
        />
    )
}
