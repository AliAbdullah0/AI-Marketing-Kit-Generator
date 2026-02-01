/*
  Warnings:

  - Changed the type of `logoIdeas` on the `GeneratedContent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `posts` on the `GeneratedContent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hashtags` on the `GeneratedContent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `adIdeas` on the `GeneratedContent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GeneratedContent" DROP COLUMN "logoIdeas",
ADD COLUMN     "logoIdeas" JSONB NOT NULL,
DROP COLUMN "posts",
ADD COLUMN     "posts" JSONB NOT NULL,
DROP COLUMN "hashtags",
ADD COLUMN     "hashtags" JSONB NOT NULL,
DROP COLUMN "adIdeas",
ADD COLUMN     "adIdeas" JSONB NOT NULL;
