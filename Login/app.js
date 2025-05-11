const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

//conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Andres-0712',
    database: 'app_mi_familia',
    port: 3306
});

db.connect(err => {
    if (err) return console.error('Error de conexión: ', err);
    console.log('Conectado a MySQL');
});

// === Login ===
app.post('/login', (req, res) => {
    const { user, pass } = req.body;

    const query = 'SELECT * FROM usuario WHERE nombre = ? AND contrasena = ?';
    db.query(query, [user, pass], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en la base de datos');
        }

        if (results.length > 0) {
            return res.status(200).json({ mensaje: 'Login exitoso', user: results[0] });
        } else {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }
    });
});

// === Iniciar el servidor ===
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
