import { Router } from "express";
import { userController } from "../../instances.js";
import { createUserSchema } from "./Dtos/createUser.dto.js";
import validate from "../../../middlewares/validateDTO.js";

const userRoutes = Router();

userRoutes.post("/", validate(createUserSchema), userController.createUser);

export { userRoutes };
