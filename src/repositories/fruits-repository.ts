import prisma from "database";
import { Fruit } from "@prisma/client";

async function getFruits() {
  return await prisma.fruit.findMany();
}

async function getSpecificFruit(id: number) {
  return await prisma.fruit.findFirst({
    where:{
      id
    }
  })
}

async function getSpecificFruitByName(name: string) {
  return await prisma.fruit.findFirst({
    where:{
      name
    }
  })
}

async function insertFruit(data: Omit<Fruit, "id"> ) {
  return await prisma.fruit.create({
    data
  })
}

const fruitsRepository = {
  getFruits,
  getSpecificFruit,
  getSpecificFruitByName,
  insertFruit
}

export default fruitsRepository;