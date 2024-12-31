import { IsArray, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAllProductsDTO {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  categories?: string[];

  @IsString()
  @IsOptional()
  area?: string;
}
