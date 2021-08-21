import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Request,
    UnauthorizedException
} from "@nestjs/common"
import { Auth } from "src/auth/auth.decorator"
import { AddressEntity } from "./address.entity"
import { AddressService } from "./address.service"
import { CreateAddressDTO } from "./dto/create-address.dto"
import { UpdateAddressDTO } from "./dto/update-address.dto"

@Controller("address")
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Auth()
    @Get()
    async getAllForUser(@Request() req) {
        const addresses = await this.addressService.findByUser(req.user)
        return addresses.map((address) => new AddressEntity(address))
    }

    @Auth()
    @Post()
    async create(@Request() req, @Body() createAddressDTO: CreateAddressDTO) {
        const address = await this.addressService.create(req.user, createAddressDTO)
        return new AddressEntity(address)
    }

    @Auth()
    @Put(":id")
    async update(
        @Request() req,
        @Param("id") id: string,
        @Body() updateAddressDTO: UpdateAddressDTO
    ) {
        const address = await this.addressService.findById(id)
        if (!address) {
            throw new NotFoundException()
        }
        if (!address.userId === req.user.id) {
            throw new UnauthorizedException()
        }
        const newAddress = await this.addressService.update(id, updateAddressDTO)
        return new AddressEntity(newAddress)
    }

    @Auth()
    @Delete(":id")
    async delete(@Request() req, @Param("id") id: string) {
        const address = await this.addressService.findById(id)
        if (!address) {
            throw new NotFoundException()
        }
        if (!address.userId === req.user.id) {
            throw new UnauthorizedException()
        }
        await this.addressService.delete(id)
        return new AddressEntity(address)
    }
}
