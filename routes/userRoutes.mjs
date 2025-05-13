import express from 'express';
import userController from '../controllers/userController.mjs';
import authMiddleware from '../middleware/auth.mjs';
import User from '../models/userSchema.mjs';

const router = express.Router();

router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/', authMiddleware.auth, async(req,res) => {
    let user = await User.findById(req.user).select('-password');
    res.json(user);
})

router.get('/isAdmin', authMiddleware.auth, authMiddleware.adminAuth, async(req,res) => {
    res.send('Admin. God mode activated.')
})
//681a82a8b79d0b7c0da2fc91 admin id


export default router;