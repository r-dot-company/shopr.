import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { useContainer } from "class-validator"
import { AppModule } from "./app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    useContainer(app.select(AppModule), {
        fallbackOnErrors: true
    })
    app.setGlobalPrefix("api/v1")
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true
    }))
    const configService = app.get(ConfigService)
    await app.listen(configService.get<number>("PORT"))
}
bootstrap()
