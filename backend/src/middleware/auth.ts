import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dataSource from "../datasource/dataSource";
import { User } from "../entities/User";
import { AuthenticatedUserRequest } from "../interface/auth";

const auth = async (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction
) => {
  let decodedData;

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      decodedData = jwt.verify(token, "secretKey") as JwtPayload;

      const userRepo = dataSource.getRepository(User);

      const user = await userRepo.findOne({
        where: {
          id: Number(decodedData.id),
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User doesn't exist" });
      }

      req.user = user;
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Please Log in again" });
  }
};

export default auth;
