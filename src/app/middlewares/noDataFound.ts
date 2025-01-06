/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export type NoDataFoundParams = Array<[]> | object;
const NoDataFound = (param : NoDataFoundParams ) => {
    const result =  (req: Request, res: Response, next: NextFunction) => {

      if (Array.isArray(param)) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "No Data Found",
          data: []
      });
      } else if (typeof param === 'object' && Object.keys(param).length === 0) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "No Data Found",
          data: []
      });
      } else {
        console.log("Received an object with properties");
      }

};
};

export default NoDataFound
