import { err, ok } from "neverthrow";
import { firstValueFrom } from "rxjs";
import { HttpStatus, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

import { GatewayRepository, RequestResult } from "../domain/repositories/gateway.repository";
import { GatewayException } from '../../core/exceptions/database.exception';

@Injectable()
export class GatewayInfrastructure implements GatewayRepository {
  constructor(private readonly httpService: HttpService) {}

  async requestByType(url: string, method: string, data: any): Promise<RequestResult> {
    try{
      const response = await firstValueFrom(this.httpService.request({
        method: method,
        url: url,
        data: data
      }));

      return ok(response.data);
    } catch (error){
      if (error.response) {
        const message = error.response.data.message || 'Unknown error';
        const errorType = error.response.data.error || 'Internal Server Error';
        const status = error.response.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const finalMessage = Array.isArray(message) ? message.join(', ') : message;

        return err(new GatewayException(finalMessage, status, errorType));

      }

      const message = error.message || 'Unknown request error';
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      return err(new GatewayException(message, status, 'Internal Server Error'));
    }
  }

}