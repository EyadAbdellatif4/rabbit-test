import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Product } from '@prisma/client';
import { GetAllProductsDTO } from './dto/get-all-products.dto';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: GetAllProductsDTO): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        AND: [
          filters.categories?.length
            ? { category: { in: filters.categories } }
            : {},
          filters.area ? { area: filters.area } : {},
        ],
      },
      take: 50, // Implement pagination to limit response size
    });
  }

  async findById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // async create(data: { name: string; category: string }): Promise<Product> {
  //   return this.prisma.product.create({ data });
  // }

  async findTopOrderedProducts(area?: string): Promise<Product[]> {
    try {
      return this.prisma.product.findMany({
    where: { area },
    select: {
      id: true,
      name: true,
      category: true,
      area: true,
      createdAt: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
    orderBy: {
      orders: {
        _count: 'desc',
      },
    },
    take: 10,
  });
    } catch (error) {
      console.error('Error fetching top ordered products:', error);
      throw new Error('Failed to fetch top ordered products');
    }
  }
}
