import { Injectable } from '@nestjs/common';
import { Mage } from '../../api-request/api-request.service';
import { Product} from './api/product.interface';


@Injectable()
export class ProductService {
    private magento;

    constructor(private readonly httpService: Mage) {
        this.magento = httpService.request();
    }

    async findOne(sku: string): Promise<Product> {

        this.magento.addMethods('products', function (cli) {
            return { load: (sku) => {
                return cli.get('/products/' + sku);
            }};
        })

        return await this.magento.products.load(sku);
    }

    async fetchAll(): Promise<Product[]> {

        let query = "1&searchCriteria[filter_groups][0][filters][0][field]=category_id&" +
        "searchCriteria[filter_groups][0][filters][0][value]=2&searchCriteria[pageSize]=20";

        return await this.magento.products.list(query);
    }
}
