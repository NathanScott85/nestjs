import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Product } from './product.model';
import { IProduct } from './interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  async insertProduct(id: string, title: string, description: string, price: number) {
    const newProduct = new this.productModel({ id, title, description, price });
    const result = await newProduct.save();
    return result.id;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((product: Product) => ({ id: product.id, title: product.title, description: product.description, price: product.price }));
  }

  async getSingleProduct(id: string) {
    const product = await this.findProduct(id);
    return { id: product.id, title: product.title, description: product.description, price: product.price };
  }

  async getSingleProductByTitle(title: string): Promise<Object> {

    const product = await this.productModel.findOne({ title: title })
    if (!product) {
      throw new NotFoundException('The Item you are looking for could not be found');
    }

    return { id: product.id, title: product.title, description: product.description, price: product.price };
  }

  async updateSingleProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {

    const updatedProduct = await this.findProduct(id);
    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;
    if (price < 0) return price;
    if(!updatedProduct) throw new NotFoundException(
      'The Item you are looking for could not be found',
    );
    updatedProduct.save();
  }
  async deleteProduct(id: string) {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) throw new NotFoundException('No Product Deleted');
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec()
    } catch (error) {
      throw new NotFoundException(
        'The Item you are looking for could not be found',
      );
    }

    if (!product) {
      throw new NotFoundException(
        'The Item you are looking for could not be found',
      );
    }
    return product;
  }
}
