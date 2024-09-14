export interface IEntidadStrategy {
  execute(params: any[]): Promise<any>;
}
