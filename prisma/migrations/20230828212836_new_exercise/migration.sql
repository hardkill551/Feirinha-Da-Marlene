-- CreateTable
CREATE TABLE "fruit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "fruit_pkey" PRIMARY KEY ("id")
);
