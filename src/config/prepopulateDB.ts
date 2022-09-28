import { prisma } from '../../repository/index'
import { createHash } from '../utility/hashHelper'
export const prepopulateDB = (): void => {
  void (async () => {
    await prisma.user.deleteMany()
    const user = await prisma.user.create({
      data: {
        name: 'some name',
        email: 'williaml1601@gmail.com',
        password: createHash('wl160100'),
        role: 'ADMIN'
      }
    })
    await prisma.category.deleteMany()
    const category = await prisma.category.create({
      data: {
        name: 'math'
      }
    })
    await prisma.course.deleteMany()
    await prisma.course.create({
      data: {
        name: 'calculus',
        lecturerId: user.id,
        categories: {
          connect: {
            id: category.id
          }
        }
      }
    })
  })()
}
