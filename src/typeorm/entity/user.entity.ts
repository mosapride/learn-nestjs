import { UserDto } from 'src/endpoint/dto/user.dto';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { CommonDate } from '../mix/data.entity';
import { AddressEntity } from './address.entity';

@Entity('user')
export class UserEntity extends CommonDate implements UserDto {
  @PrimaryColumn({ name: 'user_id' })
  userID: number;
  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'kana' })
  kana: string;
  @Column({ name: 'kana_asc' })
  kanaAsc: string;
  @Column({ name: 'address_zip_code' })
  addressZipCode: string;

  @ManyToOne(() => AddressEntity , (address)=> address.users)
  @JoinColumn({ name: 'address_zip_code' , referencedColumnName: 'zipCode' }) // nameはDBのTable名、referencedColumnNameはTypeScriptの変数名
  address: AddressEntity;
}
