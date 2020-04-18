import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductsService } from './products.service';


// using the @Controller() decorator is what will define this as a controller.
// adding the products string to the @Controller allows the api to kick in on requests  at /products
@Controller('products')
export class ProductsController {
  // @Post will allow requests for new products to be created at /products.
  constructor(private productsService: ProductsService) {}

  @Post()
   addProduct(
    @Body()
    body: {
      id: string;
      title: string;
      description: string;
      price: number;
    },
  ): Object {
    const { title, description, price} = body;
    const id = this.productsService.insertProduct(title, description, price);

    return { id, title, description, price };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }
}
