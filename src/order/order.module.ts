import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrderService } from './order.service';
import { NotificationService } from '../notification/notification.service';
import { OrderRepository } from './order.repository';
import { PrismaService } from '../prisma/prisma.service';
import { OrderController } from './order.controller';

@Module({
  imports: [HttpModule],
  providers: [
    OrderService,
    NotificationService,
    OrderRepository,
    PrismaService,
  ],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
