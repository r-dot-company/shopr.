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
        return { data: json }
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
        const { json } = await httpClient(url, {
            method: "POST",
            body: JSON.stringify(params.data)
        })
        return {
            data: json
        }
    },

    async update(resource: string, params: UpdateParams) {
        const url = makeAdminURL(resource)
        const { json } = await httpClient(url, {
            method: "PUT",
            body: JSON.stringify(params.data)
        })
        return {
            data: json
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
            data: json
        }
    },

    async deleteMany(resource: string, params: DeleteManyParams) {
        alert("Not implemented: deleteMany")
        return {
            data: [] as any
        }
    }
}
