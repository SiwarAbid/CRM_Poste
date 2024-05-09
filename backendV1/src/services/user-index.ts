import pool from "@bd/index";
import jwt from "jsonwebtoken";

type User = {
  id: number;
  nom: string;
  adresse: string;
  num_tel: number;
  email: string;
};

export const add_user = async (user: User): Promise<Response | Error> => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO client(nom, adresse, num_tel, email)
        VALUES ('${user.nom}', '${user.adresse}' , '${user.num_tel}' , '${user.email}');`;
    pool.query(sql, (error: Error, response: Response) => {
      if (error) {
        console.log("Error executing query (add_user):", error.message);
        reject(error);
      } else {
        console.log("Query result:", "SUCCESS");
        resolve(response);
      }
    });
  });
};

export const delete_user = async (id: number): Promise<Response | Error> => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM client WHERE client_id = ${id};`;
    pool.query(sql, (error: Error, response: Response) => {
      if (error) {
        console.log("Error executing query (add_user):", error.message);
        reject(error);
      } else {
        console.log("Query result:", "SUCCESS");
        resolve(response);
      }
    });
  });
};

export const update_user = async (user: User): Promise<Response | Error> => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE client SET nom = '${user.nom}', adresse = '${user.adresse}', num_tel = '${user.num_tel}', email = '${user.email}' WHERE client_id = '${user.id}';`;
    pool.query(sql, (error: Error, response: Response) => {
      if (error) {
        console.log("Error executing query (update_user):", error.message);
        reject(error);
      } else {
        console.log("Query result:", "SUCCESS");
        resolve(response);
      }
    });
  });
};
export const get_userById = async (id: number): Promise<Response | Error> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM client WHERE client_id = ${id};`;
    pool.query(sql, (error: Error, response: Response) => {
      if (error) {
        console.log("Error executing query (get_userById):", error.message);
        reject(error);
      } else {
        console.log("Query result:", "SUCCESS");
        resolve(response);
      }
    });
  });
};
export const getAll_user = async (): Promise<Response | Error> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM client;`;
    pool.query(sql, (error: Error, response: Response) => {
      if (error) {
        console.log("Error executing query (getAll_user):", error.message);
        reject(error);
      } else {
        console.log("Query result:", "SUCCESS");
        resolve(response);
      }
    });
  });
};

const user: User = {
  id: 1,
  nom: "string",
  adresse: "string",
  num_tel: 123,
  email: "string",
};

jwt.sign(user, "secret");

export const authTokenAdmin = async (
  username: string,
  password: string
): Promise<{ response: Response; token: string } | Error> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM admin WHERE username='${username}' AND password='${password}';`;
    pool.query(sql, (error: Error, response: Response) => {
      if (error) {
        console.log("Error executing query (authTokenAdmin):", error.message);
        reject(error);
      } else {
        console.log("Query result:", "SUCCESS");
        if (response.ok) {
          const token = jwt.sign({ username }, "PFE2024");
          console.log("Res: ", response, " Token: ", token);
          resolve({ response, token });
        } else {
          reject(new Error("Utilisateur ou mot de passe incorrect"));
        }
      }
    });
  });
};

export const authTokenClient = async (
  username: string,
  password: string
): Promise<any> => {
  // { response: Response; token: string }
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM client WHERE nom='${username}' AND password='${password}';`;
    pool.query(sql, (error: Error, response: Response) => {
      if (error) {
        console.log("Error executing query (authTokenClient):", error.message);
        reject(error);
      } else {
        console.log("Query result:", "SUCCESS");

        console.log("Res: ", response);
        // console.log("UserName: ", username, "Password: ", password);
        // const token = jwt.sign(
        //   { username },
        //   process.env.ACCES_SECRET_TOKEN || "SECRET_KEY"
        // );
        // console.log("Res: ", response, " Token: ", token);
        // resolve({ response, token });
        resolve(response);
      }
    });
  });
};

export const verifyToken = async (token: string) => {
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ACCES_SECRET_TOKEN || "SECRET_KEY"
    );
    // req.userData = { userId: (decodedToken as any).userId };
  } catch (error) {}
};

