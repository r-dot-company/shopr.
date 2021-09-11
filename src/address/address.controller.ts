import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    UnauthorizedException
} from "@nestjs/common"
import { User } from ".prisma/client"
import { Auth } from "src/auth/auth.decorator"
import { AddressEntity } from "./entities/address.entity"
import { AddressService } from "./address.service"
import { CreateAddressDTO } from "./dto/create-address.dto"
import { UpdateAddressDTO } from "./dto/update-address.dto"
import { AuthUser } from "src/auth/auth-user.decorator"

@Controller("address")
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Auth()
    @Get()
    async getAllFromUser(@AuthUser() user: User) {
        const addresses = await this.addressService.findByUser(user)
        return addresses.map((address) => new AddressEntity(address))
    }

    @Auth()
    @Post()
    async create(@AuthUser() user: User, @Body() createAddressDTO: CreateAddressDTO) {
        const address = await this.addressService.create(user, createAddressDTO)
        return new AddressEntity(address)
    }

    @Auth()
    @Put(":id")
    async update(
        @AuthUser() user: User,
        @Param("id") id: string,
        @Body() updateAddressDTO: UpdateAddressDTO
    ) {
        const address = await this.addressService.findById(id)
        if (!address) {
            throw new NotFoundException()
        }
        if (address.userId !== user.id) {
            throw new UnauthorizedException()
        }
        const newAddress = await this.addressService.update(id, updateAddressDTO)
        return new AddressEntity(newAddress)
    }

    @Auth()
    @Delete(":id")
    async delete(@AuthUser() user: User, @Param("id") id: string) {
        const address = await this.addressService.findById(id)
        if (!address) {
            throw new NotFoundException()
        }
        if (address.userId !== user.id) {
            throw new UnauthorizedException()
        }
        await this.addressService.delete(id)
        return new AddressEntity(address)
    }
}
