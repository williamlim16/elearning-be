import { Request, Response } from 'express'
import { prisma } from '../../repository/index'

export const getCourses = (req: Request, res: Response): void => {
  void (async () => {
    try {
      const courses = await prisma.course.findMany()
      if (courses !== null) {
        res.status(200).send(courses)
      } else {
        res.status(200).send('No courses found')
      }
    } catch (error) {
      res.status(500).send(error)
    }
  })()
}
