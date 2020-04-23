import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductsModule,UsersModule, MongooseModule.forRoot(process.env.mongoUrl)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
