/*
  Warnings:

  - You are about to drop the column `tagId` on the `articles` table. All the data in the column will be lost.
  - Made the column `categoryId` on table `tags` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `articles` DROP FOREIGN KEY `articles_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `tags` DROP FOREIGN KEY `tags_categoryId_fkey`;

-- AlterTable
ALTER TABLE `articles` DROP COLUMN `tagId`;

-- AlterTable
ALTER TABLE `tags` ADD COLUMN `articleId` INTEGER UNSIGNED NULL,
    MODIFY `categoryId` INTEGER UNSIGNED NOT NULL;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `articles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
