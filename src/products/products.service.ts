import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(
    title: string,
    description: string,
    price: number,
  ): Object {
    const prodId = uuid();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);

    return prodId;
  }

  getProducts() {
    return [...this.products];
  }
}
