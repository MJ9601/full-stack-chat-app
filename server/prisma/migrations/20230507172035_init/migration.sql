-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_msgId_fkey`;

-- AlterTable
ALTER TABLE `Message` MODIFY `msgId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Room` MODIFY `name` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_msgId_fkey` FOREIGN KEY (`msgId`) REFERENCES `Message`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
