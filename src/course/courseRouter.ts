import express from 'express'
import multer from 'multer'
import { getCourses } from './courseController'

const router = express.Router()
const upload = multer()

router.get('/', upload.none(), getCourses)

export default router
