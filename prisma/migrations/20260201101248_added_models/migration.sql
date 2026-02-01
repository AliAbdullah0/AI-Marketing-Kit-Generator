/*
  Warnings:

  - Added the required column `style` to the `Kit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kit" ADD COLUMN     "style" TEXT NOT NULL;
