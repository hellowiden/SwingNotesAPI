const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateAccessToken } = require('../token');
const { validationResult } = require('express-validator');

async function signUp(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hash
        });
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to add user.', details: error.message });
    }
}

async function logIn(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email }, 'password id');
        if (!user) {
            return res.status(401).json({ error: 'Incorrect email or password.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = generateAccessToken(user.id);
            return res.json({ token });
        } else {
            return res.status(401).json({ error: 'Incorrect email or password.' });
        }
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}


module.exports = {
    signUp,
    logIn
};
