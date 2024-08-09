import { Router, Request, Response, NextFunction } from "express";
const secureKey = process.env.MY_SECCRET_KEY;
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      console.log(req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(`there is an error`);
    }
  }
);

router.post(
  "/login",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const { userName, password } = data;
      if (userName !== "melina" || password !== "123") {
        return res.status(401).json(`Unauthorized`);
      }
      const token = jwt.sign(userName, "alasdsafdsfd");
      const result = {
        userName,
        token,
      };
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(`server error`);
    }
  }
);

export default router;
