import { Transform } from "class-transformer"

export function ToNumberTransform() {
    return Transform(({ value }) => value.toNumber())
}
