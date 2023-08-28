import joi from "joi";
import { Fruit } from "@prisma/client";

export const fruitSchema = joi.object<Omit<Fruit, "id">>({
  name: joi.string().required(),
  price: joi.number().required()
});
