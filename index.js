import express from "express";
import cookieParser from "cookie-parser";
import rotas from "./config/routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rotas);

app.listen(3000, () => console.log("servidor rodando na porta 3000"));
