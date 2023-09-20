const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    console.log(token);

    const tk = token.split(' ')[1];

    try {
        const verified = jwt.verify(tk, "test");
        req.user = verified; // You can access user information in route handlers
        next();
    } catch (error) {
        res.status(403).send('Invalid token.');
    }
}

module.exports = authenticateToken;