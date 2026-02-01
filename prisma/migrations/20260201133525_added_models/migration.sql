/*
  Warnings:

  - The `personas` column on the `GeneratedContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `whatsappMessages` column on the `GeneratedContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `logoIdeas` column on the `GeneratedContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `posts` column on the `GeneratedContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `hashtags` column on the `GeneratedContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `adIdeas` column on the `GeneratedContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GeneratedContent" DROP COLUMN "personas",
ADD COLUMN     "personas" JSONB[],
DROP COLUMN "whatsappMessages",
ADD COLUMN     "whatsappMessages" JSONB[],
DROP COLUMN "logoIdeas",
ADD COLUMN     "logoIdeas" JSONB[],
DROP COLUMN "posts",
ADD COLUMN     "posts" JSONB[],
DROP COLUMN "hashtags",
ADD COLUMN     "hashtags" JSONB[],
DROP COLUMN "adIdeas",
ADD COLUMN     "adIdeas" JSONB[];
