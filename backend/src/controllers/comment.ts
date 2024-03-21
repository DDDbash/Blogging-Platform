import { Request, Response } from "express";
import dataSource from "../datasource/dataSource";
import { AuthenticatedUserRequest } from "../interface/auth";
import { Comment } from "../entities/Comment";
import { Post } from "../entities/Post";

export const getComments = async (req: Request, res: Response) => {
  const { postId } = req.params;

  if (!postId) {
    return res.status(404).json({ message: "Post Id is missing" });
  }

  try {
    const commentRepo = dataSource.getRepository(Comment);

    const allCommentsOfPost = await commentRepo.find({
      select: {
        id: true,
        content: true,
        author: {
          id: true,
          username: true,
        },
        post: {
          id: true,
          title: true,
          content: true,
        },
        createdAt: true,
        updatedAt: true,
      },
      where: {
        post: {
          id: Number(postId),
        },
      },
      relations: {
        post: true,
        author: true,
      },
    });

    res.status(200).json({ data: allCommentsOfPost });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createComment = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  const { postId } = req.params;
  const comment = req.body;

  if (!postId) {
    return res.status(404).json({ message: "Post Id is missing" });
  }

  if (!req.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const commentRepo = dataSource.getRepository(Comment);
    const postRepo = dataSource.getRepository(Post);

    const postToAddComment = await postRepo.findOne({
      where: {
        id: Number(postId),
      },
    });

    if (!postToAddComment) {
      return res.status(404).json({ message: "Couldn't find post" });
    }

    const newcomment = new Comment();
    newcomment.content = comment.content;
    newcomment.author = req.user;
    newcomment.post = postToAddComment;

    await commentRepo.save(newcomment);

    res.status(200).json({ message: "Comment added" });
  } catch (error) {
    res.status(422).json(error);
  }
};

export const updateComment = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  const { commentId } = req.params;
  const comment = req.body;

  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!comment.content) {
    return res.status(404).json({ message: "Comment cannot be empty" });
  }

  try {
    const commentRepo = dataSource.getRepository(Comment);

    const existingComment = await commentRepo.findOne({
      where: {
        id: Number(commentId),
      },
      relations: {
        author: true,
      },
    });

    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (existingComment.author.id !== Number(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    existingComment.content = comment.content;

    await commentRepo.save(existingComment);

    res.status(200).json({ message: "Comment updated" });
  } catch (error) {
    res.status(422).json(error);
  }
};

export const deleteComment = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  const { commentId } = req.params;

  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!commentId) {
    return res.status(404).json({ message: "Commend Id not found" });
  }

  try {
    const commentRepo = dataSource.getRepository(Comment);

    const existingComment = await commentRepo.findOne({
      where: {
        id: Number(commentId),
      },
      relations: {
        author: true,
      },
    });

    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (existingComment.author.id !== Number(req.user.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await commentRepo.softDelete(Number(commentId));

    res.status(200).json({ message: "Comment successfully deleted" });
  } catch (error) {
    res.status(422).json(error);
  }
};
