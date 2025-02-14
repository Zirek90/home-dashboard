import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { UserId } from 'src/decorators/userId.decorators';
import { LoggerService } from 'src/logger/logger.service';

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post()
  async createProduct(
    @UserId() userId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    await this.productService.createProduct(createProductDto, userId);
    await this.loggerService.log(
      `user: ${userId} - add product: ${createProductDto.name}`,
    );
    return { message: `Product was added.` };
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  async updateProduct(
    @UserId() userId: string,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productService.updateProducts(id, updateProductDto);
    await this.loggerService.log(
      `user: ${userId} - update product: ${updateProductDto.name}`,
    );
    return { message: `Product was updated.` };
  }

  @Delete(':id')
  async remove(@UserId() userId: string, @Param('id') id: string) {
    const product = await this.findOne(id);
    await this.productService.removeProduct(id);
    await this.loggerService.log(
      `user: ${userId} - delete product: ${product?.name}`,
    );
    return { message: `Product was deleted.` };
  }
}
