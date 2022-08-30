/*
  Warnings:

  - You are about to drop the column `categoryId` on the `tags` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tags` DROP FOREIGN KEY `tags_categoryId_fkey`;

-- AlterTable
ALTER TABLE `articles` ADD COLUMN `categoryId` INTEGER UNSIGNED NOT NULL,
    MODIFY `status` VARCHAR(191) NULL DEFAULT '已发布';

-- AlterTable
ALTER TABLE `tags` DROP COLUMN `categoryId`;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
