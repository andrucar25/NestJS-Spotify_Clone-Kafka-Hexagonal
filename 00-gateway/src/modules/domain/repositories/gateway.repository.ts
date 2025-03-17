import { Result } from "neverthrow";

export type RequestResult = Result<any, Error>;

export abstract class GatewayRepository {
  abstract requestByType(url: string, method: string, data: any): Promise<RequestResult>;
}