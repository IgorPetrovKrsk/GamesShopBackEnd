import User from '../models/userSchema.mjs';

function auth(req, res, next) {
    if (!req.header('token') || req.header('token').length != 24) {
        return res.status(401).json({ msg: 'Invalid token' });
    } else {
        req.user = req.header('token');
        next();
    }
}

async function adminAuth(req, res, next) {
    const userId = req.user;
    const user = await User.findById(userId).select('admin');
    if (!user || !user.admin) {
        return res.status(401).json({ msg: 'Invalid admin token' });
    } else {
        next();
    }
}

export default { auth, adminAuth }