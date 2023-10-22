/*
  Warnings:

  - You are about to drop the column `lesson_id` on the `teacher_lessons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "status" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "teacher_lessons" DROP COLUMN "lesson_id",
ADD COLUMN     "group_id" INTEGER;

-- AddForeignKey
ALTER TABLE "teacher_lessons" ADD CONSTRAINT "teacher_lessons_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_lessons" ADD CONSTRAINT "teacher_lessons_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
