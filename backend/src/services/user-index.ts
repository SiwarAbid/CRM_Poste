import pool from "@bd/index";

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
export const getAll_user = async (): Promise<any> => {
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

interface PaginationOptions {
  page: number;
  perPage: number;
}

