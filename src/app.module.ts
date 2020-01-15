import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CategoryController } from './catalog/category/category.controller';
import { ProductController } from './catalog/product/product.controller';
import { Mage } from './api-request/api-request.service';
import { ProductService } from './catalog/product/product.service';
import { CartController } from './checkout/cart/cart.controller';
import { CartService } from './checkout/cart/cart.service';
import { CategoryService } from './catalog/category/category.service';


@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, CategoryController, ProductController, CartController],
  providers: [Mage, ProductService, CartService, CategoryService],
})
export class AppModule {}
