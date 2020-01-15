import { Controller, Get, Param, Query, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './api/product.interface';

@Controller('catalog/product')
export class ProductController
{
    constructor(private readonly productService: ProductService) {}

    @Get(':sku')
    load(@Param('sku') sku) : Promise<Product>
    {
        return this.productService.findOne(sku);
    }

    @Get()
    async fetch(): Promise<Product[]>
    {
        return this.productService.fetchAll();
    }
}
