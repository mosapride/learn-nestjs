import { AddressDto } from 'src/endpoint/dto/address.dto';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { CommonDate } from '../mix/data.entity';
import { UserEntity } from './user.entity';

@Entity('address')
export class AddressEntity extends CommonDate implements AddressDto {
  @PrimaryColumn({ name: 'zip_code' })
  zipCode: number;
  @Column({ name: 'address' })
  address: string;

  @OneToMany(() => UserEntity, (user) => user.addressZipCode)
  users: UserEntity[];
}
