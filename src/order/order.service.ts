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

    try {
      await this.notificationService.sendPushoverNotification(
        process.env.PUSHOVER_APP_TOKEN,
        process.env.PUSHOVER_USER_KEY,
        `New Order Created Order #${order.id} was created with ${orderItems.length} items`,
      );
    } catch (error) {
      console.error('Error sending Pushover notification:', error);
    }

    return order;
  }
}
