import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // next js infers the type if you do not pass the type as >> : string to the function.
  // you could set your own decorator by importing the @Header from @nextjs/common.
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
