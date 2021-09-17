import { API } from "./api"
import { pickFromArray } from "./utils"

const SEND_AS_MULTIPART = ["asset"]

const resourceFormats: Record<string, (data: any) => any> = {
    product: (data: API.Product): API.CreateProduct => {
        return {
            ...data,
            categories: pickFromArray(data.categories, "id")
        }
    },
    category: (data: API.Category): API.CreateCategory => {
        return {
            ...data,
            children: pickFromArray(data.children, "id"),
            parents: pickFromArray(data.parents, "id"),
        }
    },
    asset: (data: API.Asset): API.AssetCreate => {
        return {
            ...data,
            productId: data.product.id,
            typeKey: data.type.key
        }
    }
}

export const formatBody = (resource: string, data: any) => {
    data = resourceFormats[resource]?.(data) ?? data
    
    if (SEND_AS_MULTIPART.includes(resource)) {
        const form = new FormData()
        for (let key in data) {
            let value = data[key]
            if (typeof value === "object" && value?.rawFile) {
                value = value.rawFile
            }
            form.append(key, value)
        }
        return form
    }

    return JSON.stringify(data)
}
