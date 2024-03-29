/*
  Warnings:

  - The values [A_POSITIVE,B_POSITIVE,A_NEGATIVE,B_NEGATIVE,AB_POSITIVE,AB_NEGATIVE,O_POSITIVE,O_NEGATIVE] on the enum `BloodGroup` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BloodGroup_new" AS ENUM ('A+', 'B+', 'A-', 'B-', 'AB+', 'AB-', 'O+', 'O-');
ALTER TABLE "User" ALTER COLUMN "bloodType" TYPE "BloodGroup_new" USING ("bloodType"::text::"BloodGroup_new");
ALTER TYPE "BloodGroup" RENAME TO "BloodGroup_old";
ALTER TYPE "BloodGroup_new" RENAME TO "BloodGroup";
DROP TYPE "BloodGroup_old";
COMMIT;
