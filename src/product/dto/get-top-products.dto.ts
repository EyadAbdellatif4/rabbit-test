import { IsString, IsOptional } from 'class-validator';

export class GetTopProductsDTO {
  @IsString()
  @IsOptional()
  area?: string;
}
