import { SaleCreateDto } from '../models/dto/sale-created.dto';
import { SaleDto } from '../models/dto/sale.dto';
import { ClientRepository } from '../repositories/ClientRepository';
import { ProductRepository } from '../repositories/product.repository';
import { SaleProduct } from '../models/sale-product.model';
import { SaleRepository } from '../repositories/sale.repository';
import { SaleProductRepository } from '../repositories/sale-product.repository';

export async function registerSaleService(saleCreateDto: any): Promise<any> {
  const clientRepository = new ClientRepository();
  const client = await clientRepository.findByCode(saleCreateDto.clientCode);

  if (client == null) {
    throw new Error(`Client witch code ${saleCreateDto.clientCode} not found`);
  }
  if (!saleCreateDto.productsItem || saleCreateDto.productsItem.length == 0) {
    throw new Error(`Product is required`);
  }

  const products: SaleProduct[] = [];
  const productRepository = new ProductRepository();
  for (const p of saleCreateDto.productsItem) {
    const product = await productRepository.findByCode(p.code);
    if (product == null) {
      throw new Error(`Product with code ${p.code} not found`);
    }
    products.push({
      amount: p.amount,
      price: p.price,
      productId: product.id,
      subtotal: p.subTotal,
    });
  }

  const clientId: number = await clientRepository.findIdByCode(saleCreateDto.clientCode);
  const saleRepository = new SaleRepository();
  const saleProductRepository = new SaleProductRepository();
  const saleRes = await saleRepository.save(clientId, saleCreateDto.total);
  for (const product of products) {
    product.saleId = saleRes.id;
    await saleProductRepository.saveDetails(product);
  }
  return {
    code: saleRes.id,
    client: client,
    total: saleRes.total,
    payCondition: saleCreateDto.payCondition,
    productItem: saleCreateDto.productsItem,
  };
}
