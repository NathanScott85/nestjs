import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number): Record<string, any> {
    const id = uuid();
    const newProduct = new Product(id, title, description, price);
    this.products.push(newProduct);

    return id;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(id: string) {
    const product = this.findProduct(id)[0];
    return { ...product };
  }

  getSingleProductByName(productName: string) {
    const productIndex = this.products.findIndex(
      product => product.title.toLowerCase() === productName.toLowerCase(),
    );
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('I think you are lost!');
    }
    return product;
  }

  updateSingleProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(id);

    const updatedProduct = { ...product };

    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;
    if (price < 0) return price;
    return (this.products[index] = updatedProduct);
  }
  deleteProduct(id) {
    //can use underscore for the product here as its the index that matters when deleting.
    const [_, index] = this.findProduct(id);

    this.products.splice(index, 1);
    // or you could do this below: -
    // adding the index on the end [1] will specifically target the index.
    // const index = this.findProduct(id)[1];

  }

  // using this to reduce duplication
  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(product => product.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException(
        'The Item you are looking for could not be found',
      );
    }
    return [product, productIndex];
  }
  
}
