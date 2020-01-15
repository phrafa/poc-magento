import { Controller, HttpService, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './api/category.interface';

@Controller('catalog/category')
export class CategoryController
{
    constructor( private readonly categoryService: CategoryService) {}

    @Get(':id')
    findOne(@Param('id') id)
    {
        return this.categoryService.findOne(id);
    }

    @Get()
    fetchAll(@Query() query)
    {
        return this.categoryService.fetchAll(query);
    }

    @Get(':id/products')
    async getProducts(@Param('id') categoryId, @Query() queryString): Promise<Category> {
        return this.categoryService.getProducts(categoryId, queryString.page);
    }
}
