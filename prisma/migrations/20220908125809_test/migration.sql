/*
  Warnings:

  - You are about to drop the column `averateRating` on the `Course` table. All the data in the column will be lost.
  - Added the required column `averageRating` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "averateRating",
ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;
