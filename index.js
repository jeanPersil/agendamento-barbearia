import express from "express";
import cookieParser from "cookie-parser";
import rotas from "./config/routes.js";
import pageRoutes from "./config/pageRoutes.js";
import errorHandler from "./middlewares/erroHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use(rotas);
app.use(pageRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log("servidor rodando na porta 3000"));
