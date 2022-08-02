import { Body, Controller, Post } from '@nestjs/common';
import { AddressService } from 'src/service/address.service';
import { AddressDto } from './dto/address.dto';
import { ResultSaveDto } from './dto/result.save.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async save(@Body() data: AddressDto | AddressDto[]): Promise<ResultSaveDto> {
    return await this.addressService.save(data);
  }
}
