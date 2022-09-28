import userRoute from '../user/userRouter'
import courseRoute from '../course/courseRouter'
import { Express, Response, Request } from 'express'

export default function (app: Express): void {
  app.use('/user', userRoute)
  app.use('/course', courseRoute)

  app.get('/', (req: Request, res: Response) => {
    res.send('hello')
  })
}
