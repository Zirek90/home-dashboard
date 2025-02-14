import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createProduct(createProductDto: CreateProductDto, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    return await this.productRepository.save({
      ...createProductDto,
      createdBy: user,
    });
  }

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['createdBy'],
    });

    return products.map((product) => ({
      ...product,
      createdBy: product.createdBy
        ? {
            id: product.createdBy.id,
            username: product.createdBy.username,
            avatar: product.createdBy.avatar,
          }
        : null,
    }));
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!product) {
      return null;
    }

    return {
      ...product,
      createdBy: product.createdBy
        ? {
            id: product.createdBy.id,
            username: product.createdBy.username,
            avatar: product.createdBy.avatar,
          }
        : null,
    };
  }

  async updateProducts(id: string, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateProductDto);
  }

  async removeProduct(id: string) {
    return await this.productRepository.delete(id);
  }
}
