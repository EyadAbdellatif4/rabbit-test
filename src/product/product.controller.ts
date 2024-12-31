import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
  UseInterceptors,
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
    return this.productsService.getTopOrderedProducts(filters);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAllProducts(@Query() filters: GetAllProductsDTO) {
    return this.productsService.getAllProducts(filters);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async getProductById(@Param('id') id: string) {
    const productId = Number(id);
    if (isNaN(productId)) {
      throw new BadRequestException('Invalid product ID');
    }
    return this.productsService.getProductById(productId);
  }
}
