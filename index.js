import express from "express";
import cookieParser from "cookie-parser";
import rotas from "./config/routes.js";
import pageRoutes from "./config/pageRoutes.js";

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use(rotas);
app.use(pageRoutes);

app.listen(3000, () =>
  console.log(`Servidor rodando no link: http://localhost:3000/`),
);
