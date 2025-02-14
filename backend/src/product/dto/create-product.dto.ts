import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  currency: string;

  @IsOptional()
  @IsString()
  shop: string;

  @IsString()
  category: string;

  constructor(
    name: string,
    price: number,
    currency: string,
    shop: string,
    category: string,
  ) {
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.shop = shop;
    this.category = category;
  }
}
