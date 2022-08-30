/*
  Warnings:

  - You are about to drop the column `categoryId` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `articleId` on the `tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `articles` DROP FOREIGN KEY `articles_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `tags` DROP FOREIGN KEY `tags_articleId_fkey`;

-- AlterTable
ALTER TABLE `articles` DROP COLUMN `categoryId`;

-- AlterTable
ALTER TABLE `tags` DROP COLUMN `articleId`;
