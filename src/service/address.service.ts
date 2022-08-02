import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressDto } from 'src/endpoint/dto/address.dto';
import { ResultSaveDto } from 'src/endpoint/dto/result.save.dto';
import { AddressEntity } from 'src/typeorm/entity/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async save(user: AddressDto | AddressDto[]): Promise<ResultSaveDto> {
    const addressList = Array.isArray(user) ? user : [user];

    for (const a of addressList) {
      const target = await this.addressRepository.findOne({
        where: { zipCode: a.zipCode },
      });
      await this.addressRepository.save({ ...target, ...a });
    }
    return { saveRow: addressList.length };
  }
}
