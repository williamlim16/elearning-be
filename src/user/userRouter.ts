import express from 'express'
import { registerHandler, getUsers, loginHandler, updateHandler, deleteHandler } from './userController'
import multer from 'multer'

const router = express.Router()
const upload = multer()

router.get('/', getUsers)
router.put('/', upload.none(), updateHandler)
router.delete('/', upload.none(), deleteHandler)
router.post('/register', upload.none(), registerHandler)
router.post('/login', upload.none(), loginHandler)

export default router
