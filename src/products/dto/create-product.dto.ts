import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  readonly stock: string;

  @IsString()
  readonly price: string;

  @IsString()
  readonly image: string;
}
