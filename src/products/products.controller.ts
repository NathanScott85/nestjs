import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';

// using the @Controller() decorator is what will define this as a controller.
// adding the products string to the @Controller allows the api to kick in on requests  at /products

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  // @Post will allow requests for new products to be created at /products.
  constructor(private productsService: ProductsService) { }

  @Post()
  async addProduct(
    @Body()
    body: {
      id: string;
      title: string;
      description: string;
      price: number;
    }
  ) {
    const { id, title, description, price } = body;
    const prodId = await this.productsService.insertProduct({ id, title, description, price });

    return { prodId, title, description, price };
  }

  @Get()
  @ApiResponse({ status: 200, description: 'This will send a GET request to the products end point and will return an array of products.' })
  async getAllProducts() {
    return await this.productsService.getProducts();
  }

  @Get('product/:id')
  @ApiResponse({ status: 200, description: 'This end point will send a GET request using the product/:id to return a single product.' })
  async getProduct(@Param('id') id: string) {
    return await this.productsService.getSingleProduct(id);
  }

  @Get('product/:title')
  @ApiResponse({ status: 200, description: 'This end point will send a GET request product/:title to return a single product.' })
  async getProductByName(@Param('title') title: string) {
    return await this.productsService.getSingleProductByTitle(title);
  }

  //Patch will update a product where as Put will replace the entire product.
  @Patch('product/:id')
  @ApiResponse({ status: 200, description: 'This end point will send a PATCH request using the :id to update a single product.' })
  async updateProduct(
    @Param('id') id: string,
    @Body()
    body: {
      title: string;
      description: string;
      price: number;
    },
  ) {
    const { title, description, price } = body;
    await this.productsService.updateSingleProduct(id, title, description, price);
    return null;
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'This end point will send a DELETE request using the :id of the product to remove a single product.' })
  async removeProduct(@Param('id') id: string){
     await this.productsService.deleteProduct(id);
    return null;
  }
}
