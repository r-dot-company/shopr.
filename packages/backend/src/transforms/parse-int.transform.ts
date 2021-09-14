import { Transform } from "class-transformer"

export function ParseIntTransform({ each }: { each?: boolean } = {}) {
    return Transform(({ value }) => {
        if (each) {
            return value?.map((str: string) => parseInt(str))
        }
        return parseInt(value)
    })
}
