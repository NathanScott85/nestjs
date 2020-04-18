import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
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
  ): Record<string, any> {
    const { title, description, price } = body;
    const id = this.productsService.insertProduct(title, description, price);

    return { id, title, description, price };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getSingleProduct(id);
  }

  @Get('product/:title')
  getProductByName(@Param('title') title: string) {
    return this.productsService.getSingleProductByName(title);
  }

  //Patch will update a product where as Put will replace the entire product.
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body()
    body: {
      title: string;
      description: string;
      price: number;
    },
  ) {
    const { title, description, price } = body;
    this.productsService.updateSingleProduct(id, title, description, price);
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string){
    this.productsService.deleteProduct(id);
    return null;
  }
}
