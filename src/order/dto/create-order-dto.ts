import { IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDTO {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}

export class CreateOrderDTO {
  @IsInt()
  customerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}
