import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDTO } from './dto/create-order-dto';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  async create(orderData: CreateOrderDTO) {
    const orderCreateInput = {
      customerId: orderData.customerId,
    };

    return this.prisma.order.create({
      data: orderCreateInput,
    });
  }

  async getOrderItems(orderId: number) {
    return this.prisma.orderItem.findMany({
      where: { orderId },
    });
  }
}
