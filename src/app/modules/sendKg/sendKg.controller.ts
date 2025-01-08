import { Request, Response, NextFunction } from 'express';
import { sendKgService } from './sendKg.service';

const createSendKg = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await sendKgService.createSendKgIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: 'Search route created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSendKg = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const payload = req.body
    const result = await sendKgService.updateSendKgIntoDB(payload, id);
    res.status(200).json({
      success: true,
      message: 'Search route updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const sendKgController = {
  createSendKg,
  updateSendKg,
};
