import { Fruit } from "@prisma/client";
import { conflictError } from "../errors/conflict-error";
import { notFoundError } from "../errors/notfound-error";
import fruitsRepository from "../repositories/fruits-repository";


async function getFruits() {
  return await fruitsRepository.getFruits();
}

async function getSpecificFruit(id: number) {
  const fruit = await fruitsRepository.getSpecificFruit(id);
  if (!fruit) {
    throw notFoundError();
  }

  return fruit;
}

async function createFruit(fruit: Omit<Fruit, "id">) {
  const fruitAlreadyRegistered = await fruitsRepository.getSpecificFruitByName(fruit.name);
  if (fruitAlreadyRegistered) {
    throw conflictError();
  }

  fruitsRepository.insertFruit(fruit);
}

const fruitsService = {
  getFruits,
  getSpecificFruit,
  createFruit
}

export default fruitsService;