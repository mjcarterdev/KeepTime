/*
  Warnings:

  - You are about to drop the column `date` on the `TimeRecord` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `TimeRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SubTask" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TimeRecord" DROP COLUMN "date",
ADD COLUMN     "projectId" TEXT NOT NULL,
ALTER COLUMN "subTaskId" DROP NOT NULL,
ALTER COLUMN "startTime" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "endTime" DROP NOT NULL;
