import express from 'express';
import authMiddleware from '../middleware/auth.mjs'
import User from '../models/userSchema.mjs'
import Cart from '../models/cartSchema.mjs'

const router = express.Router();

router.post('/:id', authMiddleware.auth, async (req, res) => {
    try {
        const userID = req.user;
        const gameID = req.params.id;

        let userCart = await User.findById({ _id: userID }).select('cart');

        if (!userCart) {
            return res.status(400).json({ msg: 'User Not Found' });
        }

        userCart = await Cart.findById({ _id: userCart.cart });

        if (userCart.items.length == 0 && req.body.qty > 0) {
            userCart.items.push({ game: gameID, qty: req.body.qty });
        } else if (userCart.items.length == 0 && req.body.qty < 0) {
            return res.status(400).json({ msg: 'Cannot substruct past 0' })
        }

        let indexOf = userCart.items.findIndex(it => it.game == gameID)
        if (indexOf == -1) {
            userCart.items.push({ game: gameID, qty: req.body.qty });
        } else {
            userCart.items[indexOf].qty += req.body, qty;
            if (userCart.items[indexOf].qty <= 0) {
                userCart.items.splice(indexOf, 1);
            }
        }
        await userCart.save();

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
})


router.get('/', authMiddleware.auth, async (req, res) => {
    try {
        const userID = req.header;
        const user = await User.findById({ _id: userID }).select('cart');
        if (!user) {
            return res.status(400).json({ msg: 'User Not Found' });
        }
        userCart = await Cart.findById({_id:userCart.cart}).populate('items.game');
        res.json(userCart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
})

export default router;