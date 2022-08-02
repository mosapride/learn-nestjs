import { CommonDateDto } from 'src/endpoint/dto/common.date.dto';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonDate implements CommonDateDto {
  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt: Date;
}
