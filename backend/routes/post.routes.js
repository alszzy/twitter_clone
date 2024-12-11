import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { createPost, getAllPosts, deletePost, createComment } from '../controller/post.controller.js'

const router = express.Router()

router.post('/create', protectRoute, createPost)

router.get('/', protectRoute, getAllPosts)
router.delete('/:id', protectRoute, deletePost)
router.post('/comment/:id', protectRoute, createComment)

export default router