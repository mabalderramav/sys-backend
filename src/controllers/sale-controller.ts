import { Request, Response } from 'express';
// import {SaleService} from "../services/sale.service";
import { registerSaleService } from '../services/saleService';

export const saleSave = async (req: Request, res: Response) => {
  try {
    // const saleService = new SaleService();
    const data = req.body;
    // const response = await saleService.save(data);
    const response = await registerSaleService(data);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};
