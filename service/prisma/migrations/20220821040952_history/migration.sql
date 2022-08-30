/*
  Warnings:

  - Made the column `tagId` on table `articles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `articles` DROP FOREIGN KEY `articles_tagId_fkey`;

-- AlterTable
ALTER TABLE `articles` MODIFY `status` VARCHAR(191) NULL DEFAULT 'publish',
    MODIFY `isTop` BOOLEAN NULL DEFAULT false,
    MODIFY `tagId` INTEGER UNSIGNED NOT NULL;

-- CreateTable
CREATE TABLE `history` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `describe` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
