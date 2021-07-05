import { Controller,Post,Body } from '@nestjs/common';
import { PaymentService } from './payment.service'
import {PaymentDto} from './dto/payment.dto'

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('create')
    create(@Body() createUserDto: PaymentDto) {
      return this.paymentService.create(createUserDto);
    }
  
    // @Get()S
    // findAll() {
    //   return this.paymentService.findAll();
    // }
  
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.paymentService.findOne(+id);
    // }
  
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //   return this.paymentService.update(+id, updateUserDto);
    // }
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.paymentService.remove(+id);
    // }
}
