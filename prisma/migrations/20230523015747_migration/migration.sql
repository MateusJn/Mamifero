-- CreateTable
CREATE TABLE "Veado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "temChifre" BOOLEAN NOT NULL,

    CONSTRAINT "Veado_pkey" PRIMARY KEY ("id")
);
