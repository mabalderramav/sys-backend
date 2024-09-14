import { IEntidadStrategy } from '../IEntidadStrategy';

export class EntidadContext {
  private strategy!: IEntidadStrategy;

  setStrategy(strategy: IEntidadStrategy) {
    this.strategy = strategy;
  }

  async executeStrategy(params: any): Promise<any> {
    return await this.strategy.execute(params);
  }
}
