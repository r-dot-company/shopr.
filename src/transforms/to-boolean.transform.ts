import { Transform } from "class-transformer"

export function ToBooleanTransform() {
    return Transform(({ value }) => !!value)
}
