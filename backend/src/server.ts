import express, {
  Application,
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import "dotenv/config";
import mysql from "mysql2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";

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

// db.connect((err: Error) => {
//   if (err) {
//     throw err;
//   }
//   console.log("Connected to the database");
// });

//API Route: CRUD User
type User = {
  id: number;
  nom: string;
  adresse: string;
  num_tel: number;
  email: string;
};
type Admin = {
  matricule: string;
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
        const sql = `INSERT INTO admin (matricule, nom_admin, email, num_tel, region, mdp, isAdmin) 
        VALUES ('${data.matricule}','${data.nom_admin}','${data.email}',${data.num_tel},'${data.region}','${data.mdp}',${data.isAdmin})`;
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
    const matricule = request.body.matricule;
    const password = request.body.password;
    const authTokenClient = async (
      matricule: string,
      password: string
    ): Promise<any> => {
      return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM admin WHERE matricule='${matricule}' AND mdp='${password}';`;
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
              const token = jwt.sign({ matricule }, "PFE2024");
              resolve({ token, response });
            } else {
              console.log("Invalid credentials");
              reject(error);
            }
          }
        });
      });
    };
    const res = await authTokenClient(matricule, password);
    console.log("res: ", res);
    return response.status(200).json({ token: res.token, user: res.response });
  } catch (error) {
    return response.status(500).json({ error: "Failed to AuthWithTokenUser " });
  }
});

app.get("/accueil", async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"];
    console.log("Token: ", token);
    if (!token)
      return res.status(401).json({ message: "Unauthorized (without token)" });

    jwt.verify(token, "PFE2024", (err, decoded: any) => {
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
// Middleware pour vérifier le JWT
// const verifyToken = (req: any, res: Response, next: Next) => {
//   const token = req.headers["authorization"];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   jwt.verify(token.split(" ")[1], "PFE2024", (err: any, decoded: any) => {
//     if (err) return res.status(401).json({ message: "Unauthorized" });
//     req.user = decoded;
//     next();
//   });
// };

// Exemple d'endpoint protégé
// app.get("/accueil", verifyToken, (req: any, res) => {
//   res.json({ message: "Profile accessed successfully", user: req.user });
// });
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
