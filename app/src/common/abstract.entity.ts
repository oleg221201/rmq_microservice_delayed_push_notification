import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class AbstractEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    nullable: false,
  })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    nullable: false,
  })
  updatedAt: string;
}
