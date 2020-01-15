import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CartService} from './cart.service';
import { Cart} from './api/cart.interface';
import { createContextId } from '@nestjs/core';
import { AddItemDto } from './dto/add-item.dto';

@Controller('checkout/cart')
export class CartController {
    constructor ( private readonly cartService: CartService) {}

    /**
     * Get info Cart
     */
    @Get(':id')
    getCart(@Param('id') id): Promise<Cart>
    {
        return this.cartService.cart(id);
    }

    @Get(':id/items')
    getItems(@Param('id') hashId): Promise<Cart>
    {
        return this.cartService.getItems(hashId);
    }

    @Get(':id/payment-information')
    getPaymentInformation(@Param('id') hashId): Promise<Cart>
    {
        return this.cartService.getPaymentInformation(hashId);
    }

    @Get(':id/totals')
    getTotals(@Param('id') hashId): Promise<Cart>
    {
        return this.cartService.getTotals(hashId);
    }

    @Post()
    createCartGuest(): Promise<Cart>
    {
        return this.cartService.createCart();
    }

    @Post(':id/items')
    addItem(@Param('id') cartId: number, @Body() data: AddItemDto): Promise<Cart>
    {
        return this.cartService.addItem(cartId, data);
    }

    @Post(':id/address')
    addAddress(@Param('id') cartId: number, @Body() data: AddItemDto): Promise<Cart>
    {
        return this.cartService.addAddress(cartId, data);
    }

    @Post(':id/estimate-shipping-address')
    estimateShippingAddress(@Param('id') cartId: number, @Body() data): Promise<Cart>
    {
        console.log(data)
        return this.cartService.estimateShippingAddress(cartId, data);
    }

    @Post(':id/shipping-information')
    createShippingInformation(@Param('id') cartId: number, @Body() data): Promise<Cart>
    {
        return this.cartService.shippingInformation(cartId, data);
    }

    @Post(':id/order')
    placeOrder(@Param('id') cartId: number, @Body() data): Promise<Cart>
    {
        return this.cartService.placeOrder(cartId, data);
    }
}
