/*
  Warnings:

  - Added the required column `outline` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `links` ADD COLUMN `outline` VARCHAR(191) NOT NULL;
