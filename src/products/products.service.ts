import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  insertProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ): Object {
    const newProduct = new Product(id, title, description, price);
    this.products.push(newProduct);
    return this.products;
  }
}
