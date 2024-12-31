import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { ProductDTO } from './dto/product.dto';
import { GetTopProductsDTO } from './dto/get-top-products.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productsRepository: ProductRepository,
    private prismaService: PrismaService,
  ) {}

  async getAllProducts(filters: GetAllProductsDTO): Promise<ProductDTO[]> {
    const products = await this.productsRepository.findAll(filters);

    if (!products.length) {
      throw new NotFoundException('No products found matching the criteria');
    }

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      area: product.area,
      createdAt: product.createdAt,
    }));
  }

  async getProductById(id: number): Promise<ProductDTO> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      area: product.area,
      createdAt: product.createdAt,
    };
  }

  async getTopOrderedProducts(
    filters: GetTopProductsDTO,
  ): Promise<ProductDTO[]> {
    // console.log('😎😎😎😎😎😎😎😎', filters);
    const products = await this.productsRepository.findTopOrderedProducts(
      filters.area,
    );
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      area: product.area,
      createdAt: product.createdAt,
      orderCount: product['_count'].orders,
    }));
  }
}
