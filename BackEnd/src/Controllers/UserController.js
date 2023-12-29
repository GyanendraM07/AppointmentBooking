const express = require('express');
const router = express.Router();
const userService = require('../ControllerServices/UserService');
const jwt = require('jsonwebtoken');

/**
 *
 * @author Gyanendra Mishra
 * @since November 24, 2023
 */

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await userService.authLogin(email, password);
        if (response.status === 200) {
            res.status(200).json(response);
        } else if (response.status === 401) {
            res.status(401).json(response);
        } else if (response.status === 404) {
            res.status(404).json(response);
        } else {
            res.status(500).json({ status: 'Internal Server Error', message: 'An unexpected error occurred', });
        }
    } catch (error) {
        console.error('Error in loginController:', error.message);
        res.status(500).json({
            status: 'Internal Server Error',
            message: 'An unexpected error occurred',
        });
    }
});

router.get('/getTokenAndData', async (req, res) => {
    try {
        const { urlKey } = req.query; 
        const response = await userService.getTokenAndurlData(urlKey);
        if (response.status === 200) {
            res.status(200).json(response);
        } else {
            res.status(500).json({ status: 'Internal Server Error', message: 'An unexpected error occurred', });
        } 
    } catch (error) {
        console.error('Error generating token:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})


module.exports = router;