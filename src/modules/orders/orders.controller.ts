import { OrdersService } from './orders.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto, FindOrderDto } from './orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  async findOne(@Param() findOneDto: FindOrderDto) {
    return this.ordersService.findOne(findOneDto.id);
  }
}
