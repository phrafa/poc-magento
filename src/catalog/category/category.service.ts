import { Injectable } from '@nestjs/common';
import { Mage } from '../../api-request/api-request.service';
import { Category } from './api/category.interface';

import * as qstring from 'json-to-query-string';

@Injectable()
export class CategoryService {
    private magento;

    constructor(private readonly httpService: Mage) {
        this.magento = httpService.request();
    }

    async findOne(categoryId)
    {
        this.magento.addMethods('categories', function (cli) {
            return { load: (categoryId) => {
                return cli.get('/categories/' + categoryId);
            }};
        })

        return await this.magento.categories.load(categoryId);
    }

    async fetchAll(query = {})
    {
        if (!Object.keys(query).length) {
            return await this.magento.categories.list();
        }

        this.magento.addMethods('categories', function (cli) {
            return { filter: (query) => {
                let endpointUrl = '/categories/?' + qstring(query);

                return cli.get(endpointUrl);
            }};
        })
        
        return await this.magento.categories.filter(query);
    }

    async getProducts(categoryId: number, page: number = 1)
    {
        let query = "1&searchCriteria[filter_groups][0][filters][0][field]=category_id&" +
        "searchCriteria[filter_groups][0][filters][0][value]=" + categoryId + 
        "&searchCriteria[pageSize]=20&searchCriteria[currentPage]=" + page;

        return await this.magento.products.list(query);
    }
}
