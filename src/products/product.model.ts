import { ApiProperty } from "@nestjs/swagger";
import { IProduct }from './interface';

export class Product {
    @ApiProperty({ description: 'The id assigned to the Product', type: String })
    public id: string;

    @ApiProperty({ description: 'The id assigned to the Product', type: String, required: true })
    public title: string;

    @ApiProperty({ description: 'The id assigned to the Product', type: String, required: true })
    public description: string;

    @ApiProperty({ description: 'The Price assigned to the Product', type: String, required: true })
    public price: number;

  constructor({id, title, description, price}: IProduct) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
