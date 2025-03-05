const mysql = require('mysql2');

// Créer une connexion à MySQL
const connection = mysql.createConnection({
  host: 'localhost',  // Adresse du serveur MySQL (par défaut, localhost)
  user: 'root',       // Votre nom d'utilisateur MySQL (par défaut, 'root')
  password: 'password', // Votre mot de passe MySQL
});

// Connecter à MySQL
connection.connect(err => { 
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.stack);
    return;
  }
  console.log('Connecté à MySQL avec l\'ID ' + connection.threadId);
});

// Créer une nouvelle base de données
const createDatabase = async () => {
  const databaseName = 'eatorder';
  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
    console.log(`Base de données "${databaseName}" créée avec succès.`);
  } catch (err) {
    console.error('Erreur lors de la création de la base de données:', err.message);
  } finally {
    // Fermer la connexion
    connection.end();
  }
};

createDatabase();

