-- CreateTable
CREATE TABLE "Horario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataHora" DATETIME NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "profissionalId" TEXT NOT NULL,
    "agendamentoId" TEXT,
    CONSTRAINT "Horario_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Horario_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "Agendamento" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Horario_profissionalId_dataHora_key" ON "Horario"("profissionalId", "dataHora");
