import { Injectable } from '@nestjs/common';
import { Magento2Client } from 'magento2-rest-client';


@Injectable()
export class Mage {
    
    private option = {
        'url': process.env.MAGENTO_URL,
        'consumerKey': process.env.MAGENTO_KEY,
        'consumerSecret': process.env.MAGENTO_SECRET,
        'accessToken': process.env.MAGENTO_TOKEN,
        'accessTokenSecret': process.env.MAGENTO_TOKEN_SECRET
    }
    
    request()
    {
        return Magento2Client(this.option);
    }

    

}
