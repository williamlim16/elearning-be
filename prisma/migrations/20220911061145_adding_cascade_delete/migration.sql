-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_lecturerId_fkey";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
