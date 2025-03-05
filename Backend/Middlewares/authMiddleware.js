const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Extraire le token du header "Authorization"

    if (!token) {
        return res.status(403).json({ error: 'Token requis' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token invalide' });
        }

        req.user = decoded;  // Stocker les informations de l'utilisateur dans `req.user`
        next();
    });
};

module.exports = verifyToken;
//un middleware pour vérifier si l'utilisateur a un token valide avant d'accéder à certaines routes.