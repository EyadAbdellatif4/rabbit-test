import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { ProductDTO } from './dto/product.dto';
import { GetTopProductsDTO } from './dto/get-top-products.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async getAllProducts(filters: GetAllProductsDTO): Promise<ProductDTO[]> {
    try {
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
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }

  async getProductById(id: number): Promise<ProductDTO> {
    try {
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
    } catch (error) {
      console.error(`Error fetching product by ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to fetch product');
    }
  }

  async getTopOrderedProducts(
    filters: GetTopProductsDTO,
  ): Promise<ProductDTO[]> {
    try {
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
    } catch (error) {
      console.error('Error fetching top ordered products:', error);
      throw new InternalServerErrorException(
        'Failed to fetch top ordered products',
      );
    }
  }
}
