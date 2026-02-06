/*
  Warnings:

  - You are about to drop the `Horario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `dataHora` on the `Agendamento` table. All the data in the column will be lost.
  - Added the required column `data` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Horario_profissionalId_dataHora_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Horario";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Disponibilidade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "diaSemana" INTEGER NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
    "profissionalId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Disponibilidade_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agendamento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "horario" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AGENDADO',
    "precoHistorico" DECIMAL NOT NULL,
    "clienteId" TEXT NOT NULL,
    "profissionalId" TEXT NOT NULL,
    "servicoId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Agendamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Agendamento_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Agendamento_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Agendamento" ("clienteId", "createdAt", "id", "precoHistorico", "profissionalId", "servicoId", "status", "updatedAt") SELECT "clienteId", "createdAt", "id", "precoHistorico", "profissionalId", "servicoId", "status", "updatedAt" FROM "Agendamento";
DROP TABLE "Agendamento";
ALTER TABLE "new_Agendamento" RENAME TO "Agendamento";
CREATE UNIQUE INDEX "Agendamento_profissionalId_data_horario_key" ON "Agendamento"("profissionalId", "data", "horario");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
