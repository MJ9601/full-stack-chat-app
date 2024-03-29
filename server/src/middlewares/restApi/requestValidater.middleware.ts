import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const requestValidater =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, query: req.query, params: req.params });
      return next();
    } catch (err: any) {
      return res.status(422).send(err.message);
    }
  };

export default requestValidater;
