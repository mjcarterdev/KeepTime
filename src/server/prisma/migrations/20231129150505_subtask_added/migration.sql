-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SubTask" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
