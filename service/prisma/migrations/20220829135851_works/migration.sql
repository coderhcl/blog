-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `imgUrl` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `sourceUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
