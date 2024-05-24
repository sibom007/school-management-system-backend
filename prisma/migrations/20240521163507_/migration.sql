-- CreateEnum
CREATE TYPE "BloodDonate" AS ENUM ('YES', 'NO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "donateBlood" "BloodDonate" NOT NULL DEFAULT 'NO';
