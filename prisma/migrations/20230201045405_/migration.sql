/*
  Warnings:

  - You are about to drop the column `oracleID` on the `cards` table. All the data in the column will be lost.
  - Added the required column `oracleId` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "oracleID",
ADD COLUMN     "oracleId" TEXT NOT NULL;
