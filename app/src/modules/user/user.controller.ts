import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ErrorMessages } from '~common/constants/errorMessages.constants';
import { UseSwagger } from 'src/decorators/swagger.decorator';
import { ClassSerializer } from 'src/interceptors/object-serializer.interceptor';
import { UserResponseDto } from './dto/response-user.dto';
import { DefaultMessageResponse } from '~common/responses';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseSwagger({
    operation: { summary: 'Create user' },
    response: {
      description: 'Successfully created user',
      type: UserResponseDto,
      status: HttpStatus.CREATED,
    },
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @UseInterceptors(ClassSerializer(UserResponseDto))
  @Post()
  async create(@Body() body: CreateUserDto): Promise<DefaultMessageResponse> {
    const isExist = await this.userService.findOne({
      where: { name: body.name },
    });

    if (isExist) {
      throw new BadRequestException(ErrorMessages.USER.ALREADY_EXISTS);
    }

    await this.userService.createUser(body);

    return { message: 'User successfully created' };
  }

  @UseSwagger({
    operation: { summary: 'Get users list' },
    response: {
      description: 'Successfully got users list',
      type: UserResponseDto,
      isArray: true,
      status: HttpStatus.OK,
    },
  })
  @UseInterceptors(ClassSerializer(UserResponseDto))
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.find();
  }

  @UseSwagger({
    operation: { summary: 'Get user by id' },
    response: {
      description: 'Successfully got user by id',
      type: UserResponseDto,
      status: HttpStatus.OK,
    },
    possibleCodes: [HttpStatus.NOT_FOUND],
  })
  @UseInterceptors(ClassSerializer(UserResponseDto))
  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException(ErrorMessages.USER.NOT_FOUND);
    }

    return user;
  }
}
