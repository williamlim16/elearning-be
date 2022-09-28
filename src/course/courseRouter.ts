import express from 'express'
import multer from 'multer'
import { getCourses, addCourse } from './courseController'

const router = express.Router()
const upload = multer()

router.get('/', upload.none(), getCourses)
router.post('/add', upload.none(), addCourse)

export default router
