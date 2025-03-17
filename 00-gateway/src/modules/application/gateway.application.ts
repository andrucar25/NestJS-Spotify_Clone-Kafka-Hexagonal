import { Inject, Injectable } from '@nestjs/common';

import { GatewayRepository } from '../domain/repositories/gateway.repository';
import { GatewayInfrastructure } from '../infrastructure/gateway.infrastructure';

@Injectable()
export class GatewayApplication {
  constructor(
    @Inject(GatewayInfrastructure)
    private readonly repository: GatewayRepository
  ) {}

  async endpointRequest(url: string, method: string, data: any) {
    return await this.repository.requestByType(url, method, data);
  }
}
