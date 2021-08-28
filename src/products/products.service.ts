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

  // async buyOne(id: number, mount: number) {
  //   const product = await this.productsRepository.findOne(id);

  //   if (!product) {
  //     throw new BadRequestException(
  //       'Error, no existe el producto que quieres comprar',
  //     );
  //   }

  //   if (!updatedProduct) {
  //     throw new BadRequestException('Error, al actualizar el producto');
  //   }

  //   return updatedProduct;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.update(id, updateProductDto);

    if (!product) {
      throw new BadRequestException('Error al actualizar el producto');
    }

    return product;
  }

  async remove(id: number) {
    const removed = await this.productsRepository.delete(id);

    if (!removed) {
      throw new BadRequestException('Error al eliminar el producto');
    }
    return removed;
  }
}
