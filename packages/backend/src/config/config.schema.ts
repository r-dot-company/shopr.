import Joi from "joi"

export const configSchema = Joi.object({
    PORT: Joi.number().port().default(3000),
    JWT_SECRET: Joi.string().required(),
    JWT_TTL: Joi.string().default("7d"),
    MAX_UPLOAD_FILE_SIZE_MB: Joi.number().positive().default(5),
    SALT_ROUNDS: Joi.number().default(5),
    STORAGE_DIR: Joi.string().default("storage")
})
