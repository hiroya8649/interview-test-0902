import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '@schemas/order.schema';
import { CreateOrderDto } from './orders.dto';
import * as mongoose from 'mongoose';
import { Product, ProductDocument } from '@schemas/product.schema';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items } = createOrderDto;
    const pids = items.map((i) => i.productId);
    const products = await this.productModel.find({ _id: { $in: pids } });
    if (products.length != new Set(pids).size) {
      throw new BadRequestException('Invalid productId exists in order');
    }

    const product2Price = {};
    products.forEach((p) => {
      product2Price[p.id] = p.price;
    });
    const pricedItems = items.map((item) => {
      return { ...item, price: product2Price[item.productId.toString()] };
    });
    const createdOrder = new this.orderModel({
      items: pricedItems,
      status: 'success',
    });
    return createdOrder.save();
  }

  async findOne(id: mongoose.ObjectId) {
    const o = await this.orderModel.findById(id);
    if (o == null) throw new NotFoundException('Not valid order id');
    return o;
  }
}
