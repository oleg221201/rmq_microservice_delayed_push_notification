import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserResponseDto implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @Exclude()
  createdAt: string;

  @Exclude()
  updatedAt: string;
}
