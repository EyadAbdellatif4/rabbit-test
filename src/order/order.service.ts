import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order-dto';
import { NotificationService } from '../notification/notification.service';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(orderData: CreateOrderDTO) {
    const order = await this.orderRepository.create(orderData);
    const orderItems = await this.orderRepository.getOrderItems(order.id);
    const userKeys = process.env.PUSHOVER_USER_KEY;
    await this.notificationService.sendNotification(
      `New Order Created Order #${order.id} was created with ${orderItems.length} items`,
      userKeys,
    );

    return order;
  }
}
