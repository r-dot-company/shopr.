import crypto from "crypto"

export function hash(input: string) {
    return crypto
        .createHash("sha256")
        .update(input, "utf8")
        .digest("hex")
}
