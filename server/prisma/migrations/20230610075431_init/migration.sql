/*
  Warnings:

  - You are about to alter the column `name` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `userIp` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - A unique constraint covering the columns `[redisId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[redisId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `redisId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redisId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Message` ADD COLUMN `redisId` VARCHAR(25) NOT NULL;

-- AlterTable
ALTER TABLE `Room` ADD COLUMN `redisId` VARCHAR(25) NOT NULL,
    MODIFY `name` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `Session` MODIFY `userIp` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Message_redisId_key` ON `Message`(`redisId`);

-- CreateIndex
CREATE UNIQUE INDEX `Room_redisId_key` ON `Room`(`redisId`);
