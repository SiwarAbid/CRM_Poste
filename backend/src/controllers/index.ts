import { Response, Request } from "express";
import {
  add_user,
  delete_user,
  getAll_user,
  get_userById,
  update_user,
} from "@services/user-index";
import { Client } from "../models/Clients";

export async function addUser(request: Request, response: Response) {
  try {
    const data = request.body;
    await add_user(data);
    return response.status(200).json({ result: "SUCCESS" });
  } catch (error) {
    console.error("Failed to add user:", error);
    return response.status(500).json({ error: "Failed to add user" });
  }
}

export async function getAllUser(_: Request, response: Response) {
  try {
    const res = await getAll_user();
    return response.status(200).json({ result: res });
  } catch (error) {
    console.error("Failed to get all user:", error);
    return response.status(500).json({ error: "Failed to get all user" });
  }
}

export async function deleteUser(request: Request, response: Response) {
  try {
    const id = request.query.id;
    console.log("FUNCTION DELETE");
    delete_user(Number(id));
    return response.status(200).json({ result: "DELETED" });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return response.status(500).json({ error: "Failed to delete user" });
  }
}
export async function updateUser(request: Request, response: Response) {
  try {
    const user = request.body;

    update_user(user);
    return response.status(200).json({ result: "UPDATED" });
  } catch (error) {
    console.error("Failed to update user :", error);
    return response.status(500).json({ error: "Failed to update user " });
  }
}

export async function getUserById(request: Request, response: Response) {
  try {
    const res = await get_userById(Number(request.params.id));
    return response.status(200).json({ result: res });
  } catch (error) {
    console.error("Failed to get user by id:", error);
    return response.status(500).json({ error: "Failed to get user by id" });
  }
}

export async function paginateClientsController(
  request: Request,
  response: Response
) {
  try {
    const res = await getAll_user();
    return response.status(200).json({ result: res });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}
