import { ProductsService } from './products.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  CreateProductDto,
  FindProductDto,
  FindProductsDto,
} from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() findProductsDto: FindProductsDto) {
    return this.productsService.findAll(findProductsDto);
  }

  @Get(':id')
  async findOne(@Param() findOneDto: FindProductDto) {
    return this.productsService.findOne(findOneDto.id);
  }
}
