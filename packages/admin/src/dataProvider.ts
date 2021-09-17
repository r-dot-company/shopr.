import {
    CreateParams,
    DataProvider,
    DeleteManyParams,
    DeleteParams,
    GetListParams,
    GetManyParams,
    GetManyReferenceParams,
    GetOneParams,
    UpdateManyParams,
    UpdateParams
} from "react-admin"
import { httpClient, makeAdminURL, parseContentRange } from "./api"
import { formatBody } from "./formatter"

function formatItem(item: any) {
    if (item.key && !item.id) {
        return {
            ...item,
            id: item.key
        }
    }
    return item
}

export const dataProvider: DataProvider = {
    async getList(resource: string, params: GetListParams) {
        const { page, perPage: per_page } = params.pagination
        const url = makeAdminURL(resource, {
            page: page - 1,
            per_page
        })
        const { headers, json } = await httpClient(url)
        const contentRange = parseContentRange(headers.get("Content-Range") || "")
        return {
            data: json.map(formatItem),
            total: contentRange?.total ?? 0
        }
    },

    async getOne(resource: string, params: GetOneParams) {
        const url = makeAdminURL(`${resource}/${params.id}`)
        const { json } = await httpClient(url)
        return {
            data: formatItem(json)
        }
    },

    async getMany(resource: string, params: GetManyParams) {
        alert("Not implemented: getMany")
        return {
            data: [] as any
        }
    },
    
    async getManyReference(resource: string, params: GetManyReferenceParams) {
        alert("Not implemented: getManyReference")
        return {
            data: [] as any,
            total: 0
        }
    },

    async create(resource: string, params: CreateParams) {
        const url = makeAdminURL(resource)
        const body = formatBody(resource, params.data)
        const { json } = await httpClient(url, {
            method: "POST",
            body
        })
        return {
            data: formatItem(json)
        }
    },

    async update(resource: string, params: UpdateParams) {
        const url = makeAdminURL(`${resource}/${params.id}`)
        const body = formatBody(resource, params.data)
        const { json } = await httpClient(url, {
            method: "PUT",
            body
        })
        return {
            data: formatItem(json)
        }
    },

    async updateMany(resource: string, params: UpdateManyParams) {
        alert("Not implemented: updateMany")
        return {
            data: [] as any
        }
    },

    async delete(resource: string, params: DeleteParams) {
        const url = makeAdminURL(`${resource}/${params.id}`)
        const { json } = await httpClient(url, {
            method: "DELETE"
        })
        return {
            data: formatItem(json)
        }
    },

    async deleteMany(resource: string, params: DeleteManyParams) {
        await Promise.all(params.ids.map(async (id) => {
            // @ts-ignore
            const { data } = await this.delete(resource, { id })
            return data
        }))
        return {
            data: params.ids
        }
    }
}
