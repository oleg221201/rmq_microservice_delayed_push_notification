import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { UseSwagger } from '../../decorators/swagger.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @UseSwagger({
    operation: { summary: 'Default endpoint' },
    response: {
      description: 'Successfully processed request',
      type: String,
      status: HttpStatus.OK,
    },
  })
  @Get()
  start(): string {
    return this.appService.start();
  }
}
