import { Request, Response } from "express";
import { IUpdateUser, IUser } from "../interfaces/user.interfaces";
import { createUserService } from "../services/user/createUser.service";
import { deleteUserService } from "../services/user/deleteUser.service";
import { listUsersService } from "../services/user/listUsers.service";
import { updateUserService } from "../services/user/updateUser.service";

export const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: IUser = request.body;

  const newUser = await createUserService(userData, request);
  return response.status(201).json(newUser);
};

export const listUserController = async (
  request: Request,
  response: Response
) => {
  const user = await listUsersService();

  return response.status(200).json(user);
};

export const updateUserController = async (req: Request, res: Response) => {
  const userData: IUpdateUser = req.body;
  const idUser = parseInt(req.params.id);

  const updatedUser = await updateUserService(userData, idUser);

  return res.json(updatedUser);
};

export const deleteUserController = async (
  request: Request,
  response: Response
) => {
  await deleteUserService(parseInt(request.params.id));

  return response.status(204).send();
};
