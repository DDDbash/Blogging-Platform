import { Response } from "express";
import dataSource from "../datasource/dataSource";
import { AuthenticatedUserRequest } from "../interface/auth";
import { User } from "../entities/User";

export const getProfile = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  if (!req.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const userRepo = dataSource.getRepository(User);

    const profile = await userRepo.findOne({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: Number(req.user.id),
      },
    });

    res.status(200).json({
      data: profile,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};
