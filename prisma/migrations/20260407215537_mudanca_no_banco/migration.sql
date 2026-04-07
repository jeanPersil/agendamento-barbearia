/*
  Warnings:

  - You are about to drop the `Agendamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Disponibilidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Servico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Agendamento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Disponibilidade";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Servico";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "servicos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "duracaoMin" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "expediente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "diaSemana" INTEGER NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "status_agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "agendamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL DEFAULT 1,
    "dataServico" DATETIME NOT NULL,
    "horarioDeInicio" TEXT NOT NULL,
    "horarioDeFim" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "agendamentos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "agendamentos_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "servicos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "agendamentos_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status_agendamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "metodos_pagamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "agendamentoId" INTEGER NOT NULL,
    "metodoId" INTEGER NOT NULL,
    "valor" REAL NOT NULL,
    "pagoEm" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pagamentos_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "agendamentos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pagamentos_metodoId_fkey" FOREIGN KEY ("metodoId") REFERENCES "metodos_pagamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "servicos_nome_key" ON "servicos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "status_agendamento_nome_key" ON "status_agendamento"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "metodos_pagamento_nome_key" ON "metodos_pagamento"("nome");
