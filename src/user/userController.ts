import { Request, Response } from 'express'
import { prisma } from '../../repository/index'
import { createHash } from '../utility/hashHelper'

function exclude<User, Key extends keyof User> (
  user: User,
  ...keys: Key[]
): Omit<User, Key> {
  for (const key of keys) {
    delete user[key]
  }
  return user
}

export const getUsers = (req: Request, res: Response): void => {
  void (async () => {
    const users = await prisma.user.findMany()
    res.json(users)
  })()
}

export const registerHandler = (req: Request, res: Response): void => {
  const hashedPassword = createHash(req.body.password)
  void (async () => {
    try {
      await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
        }
      })
      res.status(200).json({ message: 'User successfuly created' })
    } catch (error) {
      res.status(500).json(error)
    }
  })()
}

export const loginHandler = (req: Request, res: Response): void => {
  const hashedPassword = createHash(req.body.password)
  void (async () => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email
        }
      })
      if (user === null) {
        res.status(500).send('Email Does not exist')
      } else if (user?.password === hashedPassword) {
        res.status(200).send(exclude(user, 'password'))
      }
    } catch (error) {
      res.status(500).send(error)
    }
  })()
}

export const updateHandler = (req: Request, res: Response): void => {
  const hashedPassword = createHash(req.body.updatedPassword)
  void (async () => {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          email: req.body.email
        },
        data: {
          name: req.body.name,
          password: hashedPassword,
          email: req.body.updatedEmail
        }
      })
      if (updatedUser !== null) {
        res.status(200).send('OK')
      } else {
        res.status(500).send('Something went wrong')
      }
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  })()
}

export const deleteHandler = (req: Request, res: Response): void => {
  void (async () => {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          email: req.body.email
        }
      })
      if (deletedUser !== null) {
        res.status(200).send('User deleted')
      } else {
        res.status(500).send('Cannot find user')
      }
    } catch (error) {
      res.status(500).send(error)
    }
  })()
}
