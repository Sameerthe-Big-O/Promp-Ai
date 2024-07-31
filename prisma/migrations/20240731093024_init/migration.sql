/*
  Warnings:

  - Added the required column `image` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "image" TEXT NOT NULL;
