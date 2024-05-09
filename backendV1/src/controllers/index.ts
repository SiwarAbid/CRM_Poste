import { Response, Request, NextFunction, response } from "express";
import {
  add_user,
  delete_user,
  getAll_user,
  get_userById,
  update_user,
  authTokenAdmin,
  authTokenClient,
} from "@services/user-index";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
// import { Client } from "../Database/Client";
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

export async function AuthWithTokenAdmin(request: Request, response: Response) {
  try {
    const username = request.body.username;
    const password = request.body.password;
    const res = await authTokenAdmin(username, password);
    return response.status(200).json({ result: res });
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Failed to AuthWithTokenAdmin " });
  }
}

export async function AuthWithTokenUser(request: Request, resp: Response) {
  try {
    const username = request.body.username;
    const password = request.body.password;
    const res = await authTokenClient(username, password);
    console.log("res: ", res);
    return resp.status(200).json({ result: res });
  } catch (error) {
    // console.error("ERROR AuthWithTokenUser: ");
    return resp.status(500).json({ error: "Failed to AuthWithTokenUser " });
  }
}

interface DecodedUser {
  username: string;
  password: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}
export async function VerifyTokenUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    /**
     * L'en-tête Authorization est couramment utilisé pour transporter
     * des informations d'identification ou des jetons d'authentification.
     */
    if (!token) {
      return res.status(401).json({ message: "Token non fourni" });
    }

    jwt.verify(
      token.split(" ")[1],
      process.env.ACCES_SECRET_TOKEN || "SECRET_KEY",
      (
        err: jwt.VerifyErrors | null,
        decoded: string | jwt.JwtPayload | undefined
      ) => {
        if (err) {
          return res.status(401).json({ message: "Token invalide" });
        }
        req.user = decoded as DecodedUser;
        next();
      }
    );
  } catch (error) {
    return res.status(500).json({ error: "Failed to VerifyTokenUser " });
  }
}

// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const userRepository = getRepository(Client);
//     const users = await userRepository.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };
