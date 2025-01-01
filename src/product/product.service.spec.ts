import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductRepository;

  const mockProductRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findTopOrderedProducts: jest.fn(),
  };

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    category: 'Electronics',
    area: 'North',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const filters = { categories: ['Electronics'], area: 'North' };
      mockProductRepository.findAll.mockResolvedValue([mockProduct]);

      const result = await service.getAllProducts(filters);
      expect(result).toEqual([mockProduct]);
      expect(repository.findAll).toHaveBeenCalledWith(filters);
    });

    it('should throw NotFoundException when no products found', async () => {
      mockProductRepository.findAll.mockResolvedValue([]);

      await expect(service.getAllProducts({})).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException on repository error', async () => {
      mockProductRepository.findAll.mockRejectedValue(new Error());

      await expect(service.getAllProducts({})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getProductById', () => {
    it('should return a single product', async () => {
      mockProductRepository.findById.mockResolvedValue(mockProduct);

      const result = await service.getProductById(1);
      expect(result).toEqual(mockProduct);
      expect(repository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when product not found', async () => {
      mockProductRepository.findById.mockResolvedValue(null);

      await expect(service.getProductById(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getTopOrderedProducts', () => {
    const mockTopProduct = {
      ...mockProduct,
      _count: { orders: 5 },
    };

    it('should return top ordered products', async () => {
      mockProductRepository.findTopOrderedProducts.mockResolvedValue([
        mockTopProduct,
      ]);

      const result = await service.getTopOrderedProducts({ area: 'North' });
      expect(result[0]).toHaveProperty('orderCount', 5);
      expect(repository.findTopOrderedProducts).toHaveBeenCalledWith('North');
    });

    it('should throw InternalServerErrorException on repository error', async () => {
      mockProductRepository.findTopOrderedProducts.mockRejectedValue(
        new Error(),
      );

      await expect(
        service.getTopOrderedProducts({ area: 'North' }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
