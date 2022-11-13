import {
  Controller,
  All,
  Res,
  Req,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  @All('*')
  async bff(@Req() req: Request, @Res() res: Response) {
    console.log('Original url: ', req.originalUrl);
    console.log('Method: ', req.method);
    console.log('Body: ', req.body);

    const recipient = req.originalUrl.split('/')[1];
    console.log('Recipient: ', recipient);

    const recipientUrl = process.env[recipient];

    if (recipientUrl) {
      const axiosConfig = {
        method: req.method,
        url: `${recipientUrl}${req.originalUrl}`,
        ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
      };
      console.log('Axios config: ', axiosConfig);

      try {
        if (req.originalUrl == '/products' && req.method == 'GET') {
          const cachedData = await this.cacheManager.get('products');
          if (cachedData) {
            console.log('Data from cache: ', cachedData);
            res.json(cachedData);
          } else {
            const { data } = await this.httpService.axiosRef(axiosConfig);
            await this.cacheManager.set('products', data, 1000 * 60 * 2); // two minutes
            console.log('Response data from recipient: ');
            res.json(data);
          }
        } else {
          const { data } = await this.httpService.axiosRef(axiosConfig);
          console.log('Response data from recipient: ', data);
          res.json(data);
        }
      } catch (error) {
        console.log('Some error: ', JSON.stringify(error));
        if (error.response) {
          const { status, data } = error.response;
          res.status(status).json(data);
        } else {
          res.status(500).json({ error: error.message });
        }
      }
    } else {
      res.status(502).json({ error: 'Cannot process request' });
    }
  }
}
