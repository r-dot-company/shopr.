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
} from "ra-core"
import { httpClient, makeAdminURL } from "./api"

export const dataProvider: DataProvider = {
    async getList(resource: string, params: GetListParams) {
        const { page, perPage: per_page } = params.pagination
        const url = makeAdminURL(resource, {
            page: page - 1,
            per_page
        })
        const { headers, json } = await httpClient(url)
        return {
            data: json,
            total: 1000
        }
    },

    async getOne(resource: string, params: GetOneParams) {
        return {
            data: [] as any
        }
    },

    async getMany(resource: string, params: GetManyParams) {
        return {
            data: [] as any
        }
    },

    async getManyReference(resource: string, params: GetManyReferenceParams) {
        return {
            data: [] as any,
            total: 0
        }
    },

    async create(resource: string, params: CreateParams) {
        return {
            data: [] as any
        }
    },

    async update(resource: string, params: UpdateParams) {
        return {
            data: [] as any
        }
    },

    async updateMany(resource: string, params: UpdateManyParams) {
        return {
            data: [] as any
        }
    },

    async delete(resource: string, params: DeleteParams) {
        return {
            data: [] as any
        }
    },

    async deleteMany(resource: string, params: DeleteManyParams) {
        return {
            data: [] as any
        }
    }
}
