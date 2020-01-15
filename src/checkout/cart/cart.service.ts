import { Injectable } from '@nestjs/common';
import { Cart} from './api/cart.interface';
import { Mage } from '../../api-request/api-request.service';

@Injectable()
export class CartService {
    private magento;

    constructor(private readonly httpService: Mage) {
        this.magento = httpService.request();
    }

    async cart(id: number): Promise<Cart>
    {
        this.magento.addMethods('cart', function (cli) {
            return { guest: (id) => {
                return cli.get('/guest-carts/' + id);
            }};
        })

        return await this.magento.cart.guest(id);
    }

    async getItems(hashId: String): Promise<Cart>
    {
        this.magento.addMethods('cart', function (cli) {
            
            return { guest: (hashId) => {
                return cli.get('/guest-carts/' + hashId + '/items');
            }};
        })

        return await this.magento.cart.guest(hashId);
    }

    async getPaymentInformation(hashId: String): Promise<Cart>
    {
        this.magento.addMethods('cart', function (cli) {
            
            return { paymentInformation: (hashId) => {
                return cli.get('/guest-carts/' + hashId + '/payment-information');
            }};
        })

        return await this.magento.cart.paymentInformation(hashId);
    }

    async getTotals(hashId: String): Promise<Cart>
    {
        return await this.magento.cart.totals(false, hashId);
    }

    async createCart()
    {
        return await this.magento.cart.create();
    }

    async addItem(id, data)
    {
        return await this.magento.cart.update(false, id, data);
    }

    async addAddress(id, data)
    {
        return await this.magento.cart.billingAddress(false, id, data);
    }

    async estimateShippingAddress(id, data)
    {
        return await this.magento.cart.shippingMethods(false, id, data);
    }

    async shippingInformation(id, data)
    {
        return await this.magento.cart.shippingInformation(false, id, data);
    }

    async placeOrder(id, data)
    {
        return await this.magento.cart.order(false, id, data);
    }
}
