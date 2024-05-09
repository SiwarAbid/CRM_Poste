import express, { Application, json, urlencoded } from "express";
import "./modulesAliasConfig";
import "dotenv/config";
import cors from "cors";
import { routerUser } from "@routes/user/index";


const app: Application = express();
export const PORT = 3000;
export const HOST = process.env.HOST ? process.env.HOST : "localhost";
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: false }));

app.use("/", [routerUser]);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
