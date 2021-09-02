import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type OrderItemDocument = OrderItem & Document;

@Schema()
export class OrderItem {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Product' })
  productId: ObjectId;

  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  price: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

/*********************************************************************************/

export type OrderDocument = Order & Document;

export type OrderStatus = 'successed' | 'failed';

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  status: OrderStatus;

  @Prop({ required: true })
  items: OrderItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
