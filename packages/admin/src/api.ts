import { fetchUtils } from "react-admin"
import queryString from "query-string"
import { authProvider } from "./authProvider"

const API_BASE_URL = "http://localhost:8080/api/v1"

export function httpClient(url: string, options: fetchUtils.Options = {}) {
    if (!options.headers) {
        options.headers = new Headers({
            Accept: "application/json"
        })
    }
    const auth = authProvider.getAuth()
    const headers = options.headers as Headers
    if (auth) {
        headers.set("Authorization", `Bearer ${auth.access_token}`)
    }
    return fetchUtils.fetchJson(url, options)
}

export function makeURL(path: string, params?: Record<string, any>) {
    const query = !params ? "" : queryString.stringify(params, {
        arrayFormat: "bracket"
    })
    return `${API_BASE_URL}/${path}?${query}`
}

export function makeAdminURL(...args: Parameters<typeof makeURL>) {
    const [path, ...rest] = args
    return makeURL(`admin/${path}`, ...rest)
}

export function parseContentRange(content: string) {
    const total = content.split("/").pop()
    if (!total) {
        return null
    }
    return {
        total: parseInt(total)
    }
}

export namespace API {
    export type User = {
        id: string,
        email: string,
        firstname: string,
        lastname: string,
        fullname: string,
        admin: boolean
    }

    export type Admin = {
        id: string,
        user: User,
        protected: boolean,
        createdAt: string,
        updateAt: string
    }

    export type AdminCreate = {
        userId: string
    }

    export type AssetType = {
        key: string,
        mimeType: string
    }

    export type Asset = {
        id: string,
        filename: string,
        type: AssetType,
        typeKey: string,
        product: Product
    }

    export type AssetCreate =
        Omit<Omit<Asset, "type">, "product"> & {
            productId: number
        }

    export type Category = {
        id: number,
        key: string,
        name: string,
        children: Category[],
        parents: Category[]
    }

    export type CreateCategory =
        Omit<Omit<Category, "children">, "parents"> & {
            children: number[],
            parents: number[]
        }

    export type Order = {
        id: string,
        status: OrderStatus,
        total: number,
        user: User,
        prooducts: CartProduct[],
        createdAt: string,
        updatedAt: string
    }

    export type Product = {
        id: number,
        name: string,
        price: number,
        access: Access,
        assets: Asset[],
        categories: Category[],
        createdAt: string,
        updatedAt: string
    }

    export type CreateProduct = Omit<Product, "categories"> & {
        categories: number[]
    }

    export type CartProduct = {
        amount: number,
        product: Product
    }

    export type Auth = {
        access_token: string,
        user: User
    }

    type ResponseBase = {
        status: number,
        headers: Headers,
        body: string,
        json: any
    }

    export type Response<T> = Omit<ResponseBase, "json"> & {
        json: T
    }

    export enum Access {
        PUBLIC = "PUBLIC",
        PRIVATE = "PRIVATE"
    }

    export enum OrderStatus {
        RECEIVED = "RECEIVED",
        PROCESSING = "PROCESSING",
        DELIVERY = "DELIVERY",
        DONE = "DONE"
    }
}
