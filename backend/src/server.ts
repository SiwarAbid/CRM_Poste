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
import * as nodemailer from "nodemailer";
import bcrypt, { hash } from "bcryptjs";
// import { SMTPClient } from "emailjs";
// import nodemailer, { Transporter, SentMessageInfo } from "nodemailer";

const app: Application = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST ? process.env.HOST : "localhost";

app.set("view engine", "ejs");
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
        const sql = `SELECT * FROM users WHERE user_name='${user_name}';`;
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
              console.log("response Resolve: ", response);
              resolve(response);
            } else {
              console.log("response Reject: ", response);

              console.log("Invalid credentials");
              reject(error);
            }
          }
        });
      });
    };

    const res = await authTokenClient(user_name, password);
    console.log("res ligne 126: ", res);
    const passwordOK = await bcrypt.compare(password, res[0].password);
    console.log("PasswordOK: ", passwordOK);
    if (passwordOK) {
      let secretKey = "PFE2024";
      if (res[0].status == 0) {
        secretKey = "AdminPFE2024";
      } else if (res[0].status == 1) {
        secretKey = "gestionnairePFE2024";
      }
      const token = jwt.sign({ username: user_name }, secretKey, {
        expiresIn: "15m",
      });
      console.log("response ligne 139: ", response);
      console.log("response status ligne 140: ", response.status);

      if (response.status(201)) {
        return response.json({
          status: "ok",
          token: token,
          user: res[0],
        });
      } else {
        return response.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "InvAlid Password" });
  } catch (error) {
    return response.status(500).json({ error: "Failed to AuthWithTokenUser " });
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
        const user_name: string = data.nom_prenom.replace(" ", ".");
        const sqluser = `INSERT INTO users (nom_prenom, user_name, phone,email, password, status) VALUES (?, ?,?, ?,?, 2)`;
        const valuesUser = [
          data.nom_prenom,
          user_name,
          Number(data.telephone),
          data.email,
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

/** send mailling */

// function sendEmail({ recipient_email, OTP }: { recipient_email: string; OTP: string }): Promise<{ message: string }> {
//   return new Promise((resolve, reject) => {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.MY_EMAIL || 'abidsiwar371@gmail.com',
//         pass: process.env.MY_PASSWORD || 'Gmail@2024',
//       },
//     });

//     const mailConfigs: nodemailer.SendMailOptions = {
//       from: process.env.MY_EMAIL!,
//       to: recipient_email,
//       subject: "KODING 101 PASSWORD RECOVERY",
//       html: `<!DOCTYPE html>
// <html lang="en" >
// <head>
//   <meta charset="UTF-8">
//   <title>CodePen - OTP Email Template</title>
// </head>
// <body>
// <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
//   <div style="margin:50px auto;width:70%;padding:20px 0">
//     <div style="border-bottom:1px solid #eee">
//       <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
//     </div>
//     <p style="font-size:1.1em">Hi,</p>
//     <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
//     <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
//     <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
//     <hr style="border:none;border-top:1px solid #eee" />
//     <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
//       <p>Koding 101 Inc</p>
//       <p>1600 Amphitheatre Parkway</p>
//       <p>California</p>
//     </div>
//   </div>
// </div>
// </body>
// </html>`,
//     };
//     transporter.sendMail(mailConfigs, (error, info) => {
//       if (error) {
//         console.log(error);
//         return reject({ message: `An error has occurred` });
//       }
//       return resolve({ message: "Email sent successfully" });
//     });
//   });
// }

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const getUserByEmail = async (): Promise<any> => {
      return new Promise((resolve, reject) => {
        const sqlclient = `SELECT * FROM users WHERE status = 2 AND email = '${email}'`;
        console.log("sql: ", sqlclient);
        db.query(sqlclient, (error: Error, response: Response) => {
          if (error) {
            console.log(
              "Error executing query (select client by email):",
              error.message
            );
            reject(error);
          } else {
            console.log("SUCCESS SQL Get Client ");
            resolve(response);
          }
        });
      });
    };
    const oldUser = await getUserByEmail();
    console.log("oldUser: ", oldUser);
    if (!oldUser[0]) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.ACCES_SECRET_TOKEN + oldUser.password;
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser.id_user },
      secret,
      {
        expiresIn: "10m",
      }
    );
    const link = `http://localhost:3000/reset-password/${oldUser[0].id_user}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abidsiwar371@gmail.com",
        pass: "psksuhakoaeomrck",
      },
    });

    var mailOptions = {
      from: "abidsiwar371@gmail.com",
      to: email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: error });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ OK: true });
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  // res.send("DONE");
  const getUserByEmail = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const sqlclient = `SELECT * FROM users WHERE status = 2 AND id_user = '${id}'`;
      console.log("sql: ", sqlclient);
      db.query(sqlclient, (error: Error, response: Response) => {
        if (error) {
          console.log(
            "Error executing query (select client by ID):",
            error.message
          );
          reject(error);
        } else {
          console.log("SUCCESS SQL Get Client ");
          resolve(response);
        }
      });
    });
  };
  const oldUser = await getUserByEmail();
  console.log("oldUser: ", oldUser);
  if (!oldUser[0]) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.ACCES_SECRET_TOKEN + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    console.log(verify);
    // res.send("Verified");
    res.render("FieldSucces", {
      email: oldUser[0].email,
      status: "Not Verified",
    });
  } catch (error) {
    console.log(error);
    res.render("500_", { email: oldUser[0].email, status: "Not Verified" });
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const getUserByEmail = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const sqlclient = `SELECT * FROM users WHERE status = 2 AND id_user = '${id}'`;
      console.log("sql: ", sqlclient);
      db.query(sqlclient, (error: Error, response: Response) => {
        if (error) {
          console.log(
            "Error executing query (select client by ID):",
            error.message
          );
          reject(error);
        } else {
          console.log("SUCCESS SQL Get Client ");
          resolve(response);
        }
      });
    });
  };
  const oldUser = await getUserByEmail();
  console.log("oldUser: ", oldUser);
  if (!oldUser[0]) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.ACCES_SECRET_TOKEN + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    console.log("Password: ", password);
    const encryptedPassword = await bcrypt.hash(password, 10);
    const updatePassword = async (): Promise<any> => {
      return new Promise((resolve, reject) => {
        const sqlclient = `UPDATE users SET password ='${encryptedPassword}' WHERE id_user = ${id}`;
        console.log("sql: ", sqlclient);
        db.query(sqlclient, (error: Error, response: Response) => {
          if (error) {
            console.log(
              "Error executing query (update password client):",
              error.message
            );
            reject(error);
          } else {
            console.log("SUCCESS SQL Update Password Client ");
            resolve(response);
          }
        });
      });
    };
    await updatePassword();

    res.render("index", { email: oldUser[0].email, status: "Verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});
// app.get("/email", (req: Request, res: Response) => {
//   console.log(process.env.MY_EMAIL);
// });

// app.post("/send_recovery_email", (req: Request, res: Response) => {
//   sendEmail(req.body as { recipient_email: string; OTP: string })
//     .then((response) => res.send(response.message))
//     .catch((error) => res.status(500).send(error.message));
// });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
