import { API } from "./api"

const SEND_AS_MULTIPART = ["asset"]

const resourceFormats: Record<string, (data: any) => any> = {
    product: (data: API.Product): API.CreateProduct => {
        return {
            ...data,
            categories: data.categories.map(({ id }) => id)
        }
    }
}

export const formatBody = (resource: string, data: any) => {
    data = resourceFormats[resource]?.(data) ?? data
    
    if (SEND_AS_MULTIPART.includes(resource)) {
        const form = new FormData()
        for (let key in data) {
            form.append(key, data[key])
        }
        return form
    }

    return JSON.stringify(data)
}
