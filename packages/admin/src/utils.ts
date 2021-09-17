export function pickFromArray<T extends Record<any, any>, K extends keyof T>(
    array: T[],
    key: K
) {
    return array.map((object) => object[key] as T[K])
}
