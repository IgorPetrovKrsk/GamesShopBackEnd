import User from '../models/userSchema.mjs';
import Cart from '../models/cartSchema.mjs';

async function register (req,res){
    const {username, email, password} = req.body;
    if (!username || !email || !password){
        return res.status(400).json({msg: 'All fields are required.'});
    }    
    let user = await User.findOne({email});
    if (user){
        return res.status(400).json({msg: 'Email already exists'});
    }

    user = new User({username,email,password});
    await user.save();

    const cart = new Cart({user:user._id, items:[]});
    await cart.save();

    user.cart = cart._id;
    await user.save();

    res.status(201).json({userId: user._id, cartId: cart._id});
}

 async function login (req,res) {
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({msg: 'Email and password are required.'});
    }    
    let user = await User.findOne({email});
    if (!user || user.password!=password){
        return res.status(401).json({msg: 'Authentication failed'});
    }
    res.status(200).json({userId: user._id, cartId: user.cart._id});
}

export default {login,register}