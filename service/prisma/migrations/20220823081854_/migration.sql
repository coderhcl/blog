/*
  Warnings:

  - Added the required column `category` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `articles` ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `tags` VARCHAR(191) NOT NULL;
