/*
  Warnings:

  - Added the required column `date` to the `CountrySales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CountrySales" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
