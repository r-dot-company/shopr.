import { SelectInput, SelectInputProps } from "react-admin"
import { API } from "../api"

export function OrderStatusInput(props: Omit<SelectInputProps, "choices">) {
    return (
        <SelectInput
            {...props}
            choices={Object.values(API.OrderStatus).map((key) => ({
                id: key,
                name: key
            }))}
        />
    )
}
