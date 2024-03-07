import express, {
  Application,
  json,
  urlencoded,
  Request,
  Response,
} from "express";
import cors from "cors";
import "dotenv/config";
import mysql from "mysql2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const app: Application = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST ? process.env.HOST : "localhost";

app.use(json());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(urlencoded({ extended: false }));

// Connexion Base de Données

dotenv.config();

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "la_poste",
});

//API Route: CRUD User
type User = {
  id_user: number;
  nom_prenom: string;
  user_name: string;
  contact: JSON;
  adresse: JSON;
  password: string;
  status: number;
};
type Admin = {
  user_name: string;
  nom_admin: string;
  email: string;
  num_tel: number;
  region: string;
  mdp: string;
  isAdmin: boolean;
};
app.post("/addadmin", async (request: Request, response: Response) => {
  try {
    const data = request.body;
    const add_user = async (data: Admin): Promise<any> => {
      return new Promise((resolve, reject) => {
        const sql = `INSERT INTO admin (user_name, nom_admin, email, num_tel, region, mdp, isAdmin) 
        VALUES ('${data.user_name}','${data.nom_admin}','${data.email}',${data.num_tel},'${data.region}','${data.mdp}',${data.isAdmin})`;
        db.query(sql, (error: Error, response: Response) => {
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
    await add_user(data);
    return response.status(200).json({ result: "SUCCESS" });
  } catch (error) {
    console.error("Failed to add user:", error);
    return response.status(500).json({ error: "Failed to add user" });
  }
});

app.post("/userLogin", async (request: Request, response: Response) => {
  try {
    console.log("*** USERLOGIN *** ");
    const user_name = request.body.matricule;
    const password = request.body.password;
    const authTokenClient = async (
      user_name: string,
      password: string
    ): Promise<any> => {
      return new Promise((resolve, reject) => {
        console.log("username: ", user_name, " password: ", password);
        const sql = `SELECT * FROM users WHERE user_name='${user_name}' AND password='${password}';`;
        db.query(sql, (error: Error, response: any) => {
          if (error) {
            console.log(
              "Error executing query (authTokenClient):",
              error.message
            );
            reject(error);
          } else {
            console.log("Query result:", "SUCCESS");
            if (response[0] != null) {
              console.log("response: ", response);
              let secretKey = "PFE2024";
              if (response[0].status == 0) {
                secretKey = "AdminPFE2024";
              } else if (response[0].status == 1) {
                secretKey = "gestionnairePFE2024";
              }
              const token = jwt.sign({ user_name }, secretKey);
              resolve({ token, response });
            } else {
              console.log("response: ", response);

              console.log("Invalid credentials");
              reject(error);
            }
          }
        });
      });
    };
    const res = await authTokenClient(user_name, password);
    console.log("res: ", res);
    return response.status(200).json({ token: res.token, user: res.response });
  } catch (error) {
    return response.status(500).json({ error: "Failed to AuthWithTokenUser " });
  }
});

app.get("/accueil", async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"];
    const status = req.headers["status"];
    console.log("Token: ", token);
    if (!token)
      return res.status(401).json({ message: "Unauthorized (without token)" });
    let secretKey = "PFE2024";
    if (Number(status) === 0) secretKey = "AdminPFE2024";
    else if (Number(status) === 1) secretKey = "gestionnairePFE2024";
    jwt.verify(token, secretKey, (err, decoded: any) => {
      if (err)
        return res
          .status(401)
          .json({ message: "Unauthorized (token uncorrect)" });
      console.log("VERIFY TOKEN DECODED **", decoded);
      return res.status(200).json({ result: decoded });
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to Verify_Token " });
  }
});

// CRUD Client
app.get("/clients", async (req: Request, res: Response) => {
  try {
    const getAllUser = async (): Promise<any> => {
      return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE status = 'client';`;
        db.query(sql, (error: Error, response: Response) => {
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
    const result = await getAllUser();
    return res.status(200).json({ result: result });
  } catch (error) {
    return res.status(500).json({ error: "Failed to get all user" });
  }
});
type user = {
  id: number;
  nom_prenom: string;
  user_name: string;
  contact: contact;
  adresse: adresse;
  password: string;
};
type contact = {
  telephone: number;
  email: string;
};
type adresse = {
  rue: string;
  pays: string;
  ville: string;
  code_postal: number;
};
app.post("/ajouterclient", async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const addUser = async (data: user): Promise<any> => {
      return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users (nom_prenom, user_name, contact, adresse, password, status) VALUES (?, ?, ?, ?, ?, 'client')`;
        const values = [
          data.nom_prenom,
          data.user_name,
          JSON.stringify(data.contact),
          JSON.stringify(data.adresse),
          data.password,
        ];

        db.query(sql, values, (error, results, fields) => {
          if (error) {
            console.log("Error executing query (add_user):", error.message);
            reject(error);
          } else {
            console.log("Query result:", "SUCCESS");
            resolve(results);
          }
        });
      });
    };
    const result = await addUser(data);
    return res.status(200).json({ result: "ADDED" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add user" });
  }
});
app.delete("/supprimerclient", async (req: Request, res: Response) => {
  try {
    const id = req.query.id;

    const deleteUser = async (id: number): Promise<any> => {
      return new Promise((resolve, reject) => {
        const sql = `DELETE FROM users WHERE status = 'client' AND id_user = ${id}`;
        db.query(sql, (error: Error, response: Response) => {
          if (error) {
            console.log("Error executing query (delete_user):", error.message);
            reject(error);
          } else {
            console.log("Query result:", "SUCCESS");
            resolve(response);
          }
        });
      });
    };
    const result = await deleteUser(Number(id));
    return res.status(200).json({ result: "DELETED" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete user" });
  }
});

app.put("/modifierclient", async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const updateUser = async (data: user): Promise<any> => {
      return new Promise((resolve, reject) => {
        const sql = `UPDATE users SET nom_prenom = ?, user_name = ?, contact = ?, adresse = ?, password = ? WHERE status = 'client' AND id_user = ?`;

        const values = [
          data.nom_prenom,
          data.user_name,
          JSON.stringify(data.contact),
          JSON.stringify(data.adresse),
          data.password,
          data.id,
        ];

        db.query(sql, values, (error, results, fields) => {
          if (error) {
            console.log("Error executing query (update_user):", error.message);
            reject(error);
          } else {
            console.log("Query result:", "SUCCESS");
            resolve(results);
          }
        });
      });
    };
    const result = await updateUser(data);
    return res.status(200).json({ result: "UPDATED" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add user" });
  }
});

// CRUD Gestionnaire
type gestionnaire = {
  matricule_gestionnaire: string;
  nom_prenom: string;
  email: string;
  phone: number;
  post: string;
  bureau_postal: number;
  acces: {
    client: boolean;
    reclamation: boolean;
    offre: boolean;
  };
  info_sup: {};
};
app.get("/gestionnaires", async (req: Request, res: Response) => {
  try {
    const getAllUser = async (): Promise<any> => {
      return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE status = 1;`;
        db.query(sql, (error: Error, response: Response) => {
          if (error) {
            console.log("Error executing query (getAll_user):", error.message);
            reject(error);
          } else {
            // console.log("response: ", response);
            console.log("Query result (SELECT Gestionnaire):", "SUCCESS");
            resolve(response);
          }
        });
      });
    };
    const result = await getAllUser();
    // console.log("response: ", result);

    return res.status(200).json({ result: result });
  } catch (error) {
    return res.status(500).json({ error: "Failed to get all user" });
  }
});

app.post("/ajoutergestionnaire", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log("data: ", data);
    const addUser = async (data: gestionnaire): Promise<any> => {
      return new Promise((resolve, reject) => {
        const contact: contact = {
          telephone: Number(data.phone),
          email: data.email,
        };
        const user_name: string = data.nom_prenom.replace(" ", ".");
        const sqluser = `INSERT INTO users (nom_prenom, user_name, contact, status)
        VALUES (?, ?, ?, 1);`;
        const values_user = [
          data.nom_prenom,
          user_name,
          JSON.stringify(contact),
        ];
        const recpId = `SET @last_id = LAST_INSERT_ID();`;
        const sql = `INSERT INTO gestionnaire (matricule_gestionnaire, id_user, post, bureau_postal, acces)
        VALUES ('${data.matricule_gestionnaire}', @last_id, '${data.post}', ${data.bureau_postal},?);`;
        const values_gestionnaire = [JSON.stringify(data.acces)];
        db.query(sqluser, values_user, (error, results, fields) => {
          if (error) {
            console.log(
              "Error executing query SQL USER (ADD Gestionnaire): ",
              error.message
            );
            reject(error);
          } else {
            console.log("SUCCESS SQL USER");
            db.query(recpId, (error, result) => {
              if (error) {
                console.log(
                  "Error executing query RECAP ID (ADD Gestionnaire): ",
                  error.message
                );
                reject(error);
              } else {
                console.log("SUCCESS RECAP ID");
                db.query(sql, values_gestionnaire, (error, result, fields) => {
                  if (error) {
                    console.log(
                      "Error executing query SQL Gestonnaire:",
                      error.message
                    );
                    reject(error);
                  } else {
                    console.log("SUCCESS SQL Gestionnaire");
                    resolve(result);
                  }
                });
              }
            });
          }
        });
      });
    };
    const result = await addUser(data);
    console.log("result: ", result);
    return res.status(200).json({ result: "ADDED" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add user" });
  }
});
app.delete("/supprimergestionnaire", async (req: Request, res: Response) => {
  try {
    const id = req.query.id;

    const deleteUser = async (id: number): Promise<any> => {
      return new Promise((resolve, reject) => {
        const sql = `DELETE FROM users WHERE status = 1 AND id_user = ${id}`;
        db.query(sql, (error: Error, response: Response) => {
          if (error) {
            console.log("Error executing query (delete_user):", error.message);
            reject(error);
          } else {
            console.log("Query result:", "SUCCESS");
            resolve(response);
          }
        });
      });
    };
    const result = await deleteUser(Number(id));
    return res.status(200).json({ result: "DELETED" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete user" });
  }
});

app.put("/modifiergestionnaire", async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const updateUser = async (data: user): Promise<any> => {
      return new Promise((resolve, reject) => {
        const sql = `UPDATE users SET nom_prenom = ?, user_name = ?, contact = ?, adresse = ?, password = ? WHERE status = 1 AND id_user = ?`;

        const values = [
          data.nom_prenom,
          data.user_name,
          JSON.stringify(data.contact),
          JSON.stringify(data.adresse),
          data.password,
          data.id,
        ];

        db.query(sql, values, (error, results, fields) => {
          if (error) {
            console.log("Error executing query (update_user):", error.message);
            reject(error);
          } else {
            console.log("Query result:", "SUCCESS");
            resolve(results);
          }
        });
      });
    };
    const result = await updateUser(data);
    return res.status(200).json({ result: "UPDATED" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add user" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
