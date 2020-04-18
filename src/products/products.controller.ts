import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

// using the @Controller() decorator is what will define this as a controller.
// adding the products string to the @Controller allows the api to kick in on requests  at /products
@Controller('products')
export class ProductsController {
  // @Post will allow requests for new products to be created at /products.
  constructor(private productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body()
    body: {
      id?: string;
      title: string;
      description: string;
      price: number;
    },
  ): Promise<Object> {
    const { title, description, price, id } = body;
    await this.productsService.insertProduct(id, title, description, price);
    return {
      id: id,
      title: title,
      description: description,
      price: price,
    };
  }
}
