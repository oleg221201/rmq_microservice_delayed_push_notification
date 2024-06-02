import { AbstractEntity } from '~common/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  name: string;
}
