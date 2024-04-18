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
    const user_name = request.body.username;
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

app.get("/verifytoken", async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"];
    const status = req?.headers["status"];
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
type Brith = {
  lieu: string;
  date: string;
};
type PI = {
  type: string;
  num: string;
};
type ClientType = {
  civil: string;
  nom_prenom: string;
  brith_lieu: string;
  brith_date: string;
  PI_type: string;
  PI_num: string;
  email: string;
  telephone: string;
  password: string;
};
app.post("/ajouterclient", async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const addUser = async (data: ClientType): Promise<any> => {
      return new Promise((resolve, reject) => {
        const contact: contact = {
          telephone: Number(data.telephone),
          email: data.email,
        };
        const user_name: string = data.nom_prenom.replace(" ", ".");
        const sqluser = `INSERT INTO users (nom_prenom, user_name, contact, password, status) VALUES (?, ?, ?,?, 2)`;
        const valuesUser = [
          data.nom_prenom,
          user_name,
          JSON.stringify(contact),
          data.password,
        ];
        const PI: PI = {
          type: data.PI_type,
          num: data.PI_num,
        };
        const sqlclient = `INSERT INTO client (cin_client, id_user, civil, brith, PI) VALUES (${PI.num},LAST_INSERT_ID(), ?, ?,?);`;
        const brith: Brith = {
          lieu: data.brith_lieu,
          date: data.brith_date,
        };

        const valuesClient = [
          data.civil,
          JSON.stringify(brith),
          JSON.stringify(PI),
        ];
        db.query(sqluser, valuesUser, (error, results, fields) => {
          if (error) {
            console.log("Error executing query (add_user):", error.message);
            reject(error);
          } else {
            console.log("SUCCESS SQL USER");

            db.query(
              sqlclient,
              valuesClient,
              (errorclient, responseclient: any, firlds) => {
                if (errorclient) {
                  console.log(
                    "Error executing query (add_client):",
                    errorclient
                  );
                  reject(errorclient);
                } else {
                  console.log("SUCCESS SQL CLIENT");
                  resolve(responseclient);
                }
              }
            );
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

app.get("/verifyclient", async (rep: Request, res: Response) => {
  try {
    const username = rep.query.username;
    const password = rep.query.password;
    console.log("username: ", username);
    console.log("password: ", password);
    const getClient = async (username: any, password: any): Promise<any> => {
      return new Promise((resolve, reject) => {
        const sql = `SELECT id_user FROM users WHERE status = 2 AND user_name = '${username}' AND password='${password}';`;
        db.query(sql, (error: Error, response: any) => {
          if (error) {
            console.log("Error executing query (getAll_user):", error.message);
            reject(error);
          } else {
            console.log("response: ", response);
            console.log("SUCCESS SQL USER");
            if (response[0] != null) {
              const token = jwt.sign({ username }, "PFE2024");
              resolve({ token, response });
            } else console.log("RESPONSE IMPTY !!");
          }
        });
      });
    };
    const result = await getClient(username, password);
    console.log("res: ", result);
    return res
      .status(200)
      .json({ token: result.token, response: result.response });
  } catch (error) {
    return res.status(500).json({ error: "Failed to get all user" });
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
  id_user: number;
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
        const sqluser = `SELECT * FROM users WHERE status = 1;`;
        const sqlgestionnaire = `SELECT * FROM gestionnaire;`;
        db.query(sqluser, (erroruser: Error, response: Response) => {
          if (erroruser) {
            console.log(
              "Error executing query (getAll_user):",
              erroruser.message
            );
            reject(erroruser);
          } else {
            // console.log("response: ", response);
            console.log("Query result (SELECT User): ", "SUCCESS");
            const responseUser = response;
            db.query(
              sqlgestionnaire,
              (errorgestionnaire: Error, responseGestionnaire: Response) => {
                if (errorgestionnaire) {
                  console.log(
                    "Error executing query (getAll_gestionnaire):",
                    errorgestionnaire.message
                  );
                  reject(errorgestionnaire);
                } else {
                  console.log(
                    "Query result (SELECT Gestionnaire): ",
                    "SUCCESS"
                  );
                  resolve({
                    user: responseUser,
                    gestionnaire: responseGestionnaire,
                  });
                }
              }
            );
          }
        });
      });
    };
    const result = await getAllUser();
    // console.log("response: ", result);

    return res
      .status(200)
      .json({ user: result.user, gestionnaire: result.gestionnaire });
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

app.delete("/supprimerGestionnaires", async (req, res) => {
  try {
    const idsToDelete = req.body;
    // console.log("req: ", req);
    // console.log("idsToDelete: ", idsToDelete);
    const deleteUser = async (id: number): Promise<any> => {
      return new Promise((resolve, reject) => {
        const sqlgestionnaire = `DELETE FROM gestionnaire WHERE id_user = ${id}`;
        const sqluser = `DELETE FROM users WHERE status = 1 AND id_user = ${id}`;

        db.query(sqlgestionnaire, (error: Error, response: Response) => {
          if (error) {
            console.log(
              "Error executing query (delete_gestionnaire):",
              error.message
            );
            reject(error);
          } else {
            console.log("SUCCESS SQL Gestionnaire DELETED");
            db.query(sqluser, (error, response) => {
              if (error) {
                console.log(
                  "Error executing query (delete_user):",
                  error.message
                );
                reject(error);
              } else {
                console.log("SUCCESS SQL USER DELETED");
                resolve(response);
              }
            });
          }
        });
      });
    };
    await Promise.all(
      idsToDelete.map(async (id: number) => {
        await deleteUser(id);
      })
    );

    res.status(200).send("Gestionnaires supprimés avec succès");
  } catch (error) {
    console.error("Erreur lors de la suppression des gestionnaires:", error);
    res
      .status(500)
      .send(
        "Une erreur s'est produite lors de la suppression des gestionnaires"
      );
  }
});

app.put("/modifiergestionnaire", async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const updateUser = async (data: gestionnaire): Promise<any> => {
      return new Promise((resolve, reject) => {
        const contact: contact = {
          telephone: Number(data.phone),
          email: data.email,
        };
        const user_name: string = data.nom_prenom.replace(" ", ".");
        const sqlUser = `UPDATE users 
        SET nom_prenom = ?, 
            user_name = ?, 
            contact = ? 
        WHERE id_user = ?;`;
        const valuesUser = [
          data.nom_prenom,
          user_name,
          JSON.stringify(contact),
          data.id_user,
        ];
        const sqlGestionnaire = `UPDATE gestionnaire 
SET matricule_gestionnaire = ?, 
    post = ?, 
    bureau_postal = ?, 
    acces = ? 
WHERE id_user = ?;`;
        const valuesGestionnaire = [
          data.matricule_gestionnaire,
          data.post,
          data.bureau_postal,
          JSON.stringify(data.acces),
          data.id_user,
        ];

        db.query(sqlUser, valuesUser, (error, results, fields) => {
          if (error) {
            console.log(
              "Error executing query SQL USER (update_user):",
              error.message
            );
            reject(error);
          } else {
            console.log("SUCCESS SQL USER UPDATES");
            db.query(
              sqlGestionnaire,
              valuesGestionnaire,
              (error, result, fields) => {
                if (error) {
                  console.log(
                    "Error executing query SQL Gestionnaire (UPDATE): ",
                    error.message
                  );
                  reject(error);
                } else {
                  console.log("SUCCESS SQL Gestionnaire UPDATE");
                  resolve(result);
                }
              }
            );
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
