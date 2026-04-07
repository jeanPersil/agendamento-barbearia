/*
  Warnings:

  - You are about to drop the column `password` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `senha` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_usuarios" ("email", "id", "nome", "role") SELECT "email", "id", "nome", "role" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
