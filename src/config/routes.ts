import userRoute from '../user/userRouter'
import courseRoute from '../course/courseRouter'
import { Express, Response } from 'express'

export default function (app: Express): void {
  app.use('/user', userRoute)
  app.use('/course', courseRoute)

  app.get('/', (res: Response) => {
    res.status(200).send('express server')
  })
}
