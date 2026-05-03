const jwt = require('jsonwebtoken');

async function authArtist(req, res, next) {

        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== 'artist') {
                return res.status(403).json({ message: "Forbidden: Only artists can access this resource" });
            }

            req.user = decoded;
            

            next();


        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }




    }

module.exports = { authArtist };
