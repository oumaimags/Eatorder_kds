const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 🛡️ Générer un JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } // Le token expire après 1 heure
    );
};

// 🔒 Hachage du mot de passe
const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10); // Le '10' définit la force du hachage
};

// 🔓 Vérification du mot de passe
const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { generateToken, hashPassword, comparePassword };
