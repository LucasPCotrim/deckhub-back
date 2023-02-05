/*
  Warnings:

  - Added the required column `releasedAt` to the `sets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sets" ADD COLUMN     "releasedAt" DATE NOT NULL;
