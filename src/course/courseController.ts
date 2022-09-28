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

export const addCourse = (req: Request, res: Response): void => {
  void (async () => {
    try {
      const course = await prisma.course.create({
        data: {
          name: req.body.name,
          lecturerId: req.body.userId
        }
      })
      res.status(200).send({
        message: 'Successfuly create course',
        course
      })
    } catch (error) {
      res.status(500).send(error)
    }
  })()
}
