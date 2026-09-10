/*
  Warnings:

  - You are about to drop the column `product_id` on the `order_items` table. All the data in the column will be lost.
  - Added the required column `name` to the `ProductCredential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ProductCredential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `server` to the `ProductCredential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ProductCredential` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `productcredential` DROP FOREIGN KEY `ProductCredential_productId_fkey`;

-- DropIndex
DROP INDEX `order_items_product_id_fkey` ON `order_items`;

-- DropIndex
DROP INDEX `ProductCredential_productId_key` ON `productcredential`;

-- AlterTable
ALTER TABLE `order_items` DROP COLUMN `product_id`,
    ADD COLUMN `productId` INTEGER NULL;

-- AlterTable
ALTER TABLE `productcredential` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `server` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `productId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCredential` ADD CONSTRAINT `ProductCredential_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCredential` ADD CONSTRAINT `ProductCredential_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
