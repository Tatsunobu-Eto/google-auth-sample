/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `RegistrationRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RegistrationRequest" ADD COLUMN "expiresAt" DATETIME;
ALTER TABLE "RegistrationRequest" ADD COLUMN "token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationRequest_token_key" ON "RegistrationRequest"("token");
