const jwt = require('jsonwebtoken')
const secret = '$addam@khan@dev'

const setUser = (loginUser) => {
 const payload = {
    name: loginUser.name,
    _id: loginUser._id,
    email: loginUser.email
}

const token = jwt.sign(payload, secret)
return token

}


const cheackUser = (req, res, next) => {
    try {
        const token = req.cookies?.uid; // Safely access cookies
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Login first',
            });
        }

        // Verify token
        const verifiedUser = jwt.verify(token, secret); // Use a secure secret from environment variables
        req.user = verifiedUser; // Attach the verified user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};

module.exports = {
    setUser,
    cheackUser
}