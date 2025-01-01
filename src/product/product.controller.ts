import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ProductService } from './product.service';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { GetTopProductsDTO } from './dto/get-top-products.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get('top-ordered')
  @UseInterceptors(CacheInterceptor)
  async getTopOrderedProducts(@Query() filters: GetTopProductsDTO) {
    try {
      return await this.productsService.getTopOrderedProducts(filters);
    } catch (error) {
      console.error('Error in getTopOrderedProducts:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve top ordered products',
      );
    }
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAllProducts(@Query() filters: GetAllProductsDTO) {
    try {
      return await this.productsService.getAllProducts(filters);
    } catch (error) {
      console.error('Error in getAllProducts:', error);
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async getProductById(@Param('id') id: string) {
    const productId = Number(id);
    if (isNaN(productId)) {
      throw new BadRequestException('Invalid product ID');
    }
    try {
      return await this.productsService.getProductById(productId);
    } catch (error) {
      console.error(`Error in getProductById for ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to retrieve product');
    }
  }
}
