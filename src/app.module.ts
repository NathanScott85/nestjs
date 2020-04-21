import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { password, username } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductsModule,UsersModule, MongooseModule.forRoot(
    `mongodb+srv://${username}:${password}@nextjscluster-eicie.mongodb.net/nestjs-practice?retryWrites=true&w=majority`
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
