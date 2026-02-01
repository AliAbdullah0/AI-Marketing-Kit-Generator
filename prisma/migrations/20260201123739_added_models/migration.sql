/*
  Warnings:

  - Changed the type of `personas` on the `GeneratedContent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GeneratedContent" DROP COLUMN "personas",
ADD COLUMN     "personas" JSONB NOT NULL;
