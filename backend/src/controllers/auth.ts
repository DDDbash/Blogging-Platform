import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dataSource from "../datasource/dataSource";
import { User } from "../entities/User";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const date = new Date();

  try {
    let userRepo = dataSource.getRepository(User);

    const existingUser = await userRepo.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User();
    newUser.email = email;
    newUser.username = username;
    newUser.password = hashedPassword;
    newUser.createdAt = date.toISOString();

    const result = await userRepo.save(newUser);

    const token = jwt.sign(
      { id: result.id, email: result.email, username: newUser.username },
      "secretKey",
      {
        expiresIn: "1h",
      }
    );

    const returnValue = {
      id: result.id,
      email: result.email,
      username: result.username,
      token,
    };

    res.status(200).json({ data: returnValue });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let userRepo = dataSource.getRepository(User);

    const existingUser = await userRepo.findOne({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
      },
      "secretKey",
      { expiresIn: "1h" }
    );

    const returnValue = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
      token,
    };

    res.status(200).json({ data: returnValue });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
