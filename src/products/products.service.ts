import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productsRepository.save(createProductDto);

    if (!product) {
      throw new BadRequestException('Error creating product');
    }

    return product;
  }

  async findAll() {
    const products = await this.productsRepository.find({});

    if (products.length <= 0) {
      throw new NotFoundException('No existen productos');
    }

    return products;
  }

  async buyOne(id: number, mount: number) {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new BadRequestException(
        'Error, no existe el producto que quieres comprar',
      );
    }

    if (product.stock === 0) {
      throw new NotFoundException('Error, no hay stock del producto');
    }

    let stockNumber = product.stock as number;

    stockNumber -= mount;

    const newProduct = product;
    newProduct.stock = stockNumber;

    const updatedProduct = await this.productsRepository.update(id, newProduct);

    if (!updatedProduct) {
      throw new BadRequestException('Error, al actualizar el producto');
    }

    return updatedProduct;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
