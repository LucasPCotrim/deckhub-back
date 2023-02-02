/*
  Warnings:

  - Added the required column `rarity` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "rarity" TEXT NOT NULL;
