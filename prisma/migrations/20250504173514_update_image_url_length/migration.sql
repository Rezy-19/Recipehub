/*
  Warnings:

  - Made the column `description` on table `recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ingredients` on table `recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instructions` on table `recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `origin` on table `recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `recipe` MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `imageUrl` TEXT NOT NULL,
    MODIFY `ingredients` VARCHAR(191) NOT NULL,
    MODIFY `instructions` VARCHAR(191) NOT NULL,
    ALTER COLUMN `isFavorite` DROP DEFAULT,
    MODIFY `origin` VARCHAR(191) NOT NULL,
    ALTER COLUMN `rating` DROP DEFAULT,
    ALTER COLUMN `servings` DROP DEFAULT;
