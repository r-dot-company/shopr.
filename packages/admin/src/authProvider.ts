import { AuthProvider } from "react-admin"
import { API, httpClient, makeURL } from "./api"

const AUTH = "auth"

export const authProvider: AuthProvider & {
    getAuth(): API.Auth | undefined,
    setAuth(data: API.Auth): void
} = {
    async login({ username: email, password }: {
        username: string,
        password: string
    }) {
        const url = makeURL("auth/login")
        const response: API.Response<API.Auth> = await httpClient(url, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        })
        if (response.status !== 201) {
            throw new Error(response.body)
        }
        if (!response.json.user.admin) {
            throw new Error("Unauthorized")
        }
        this.setAuth(response.json)
    },

    async checkError(error) {
        if (error.status === 401) {
            await this.logout(null)
            return Promise.reject()
        }
        return Promise.resolve()
    },

    checkAuth(params) {
        return this.getAuth() ? Promise.resolve() : Promise.reject()    
    },

    async logout() {
        localStorage.removeItem(AUTH)
    },

    async getIdentity() {
        const auth = this.getAuth()
        if (!auth) {
            throw new Error()
        }
        return {
            id: auth.user.id,
            fullName: auth.user.fullname
        }
    },

    async getPermissions() {},

    getAuth() {
        const json = localStorage.getItem(AUTH)
        return !json ? undefined : JSON.parse(json) as API.Auth
    },

    setAuth(data: API.Auth) {
        localStorage.setItem(AUTH, JSON.stringify(data))
    }
}
