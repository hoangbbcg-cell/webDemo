/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `ProductCredential` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `productcredential` MODIFY `userId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ProductCredential_productId_key` ON `ProductCredential`(`productId`);
