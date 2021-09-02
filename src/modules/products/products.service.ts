import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '@schemas/product.schema';
import { CreateProductDto, FindProductsDto } from './products.dto';
import { removeUndefinedForObject } from '@common/utils';
import * as mongoose from 'mongoose';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(findProductsDto: FindProductsDto) {
    const { lastId, pageSize = 10 } = findProductsDto;
    const query = removeUndefinedForObject({
      _id:
        lastId && lastId != ''
          ? { $gt: mongoose.Types.ObjectId(lastId) }
          : undefined,
    });
    return this.productModel.find(query).limit(pageSize);
  }

  async findOne(id: mongoose.ObjectId) {
    const p = await this.productModel.findById(id);
    if (p == null) throw new NotFoundException('Not valid order id');
    return p;
  }
}
