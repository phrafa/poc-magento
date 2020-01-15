import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  
  @Get()
  getHello(): string {
    return '<strong>BFF - RaiaDrogasil for consuming Magento Enterprise 2.3</strong>'
  }
}
