const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// CONFIGURACIÓN DE LA BASE DE DATOS
const dbConfig = {
    user: 'tu_usuario_sql',           // cambia esto
    password: 'tu_contraseña_sql',    // cambia esto
    server: 'localhost\\SQLEXPRESS',
    database: 'PC',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// RUTA PARA REGISTRAR USUARIOS
app.post('/register', async (req, res) => {
    const { usuario, password } = req.body;
    try {
        await sql.connect(dbConfig);
        await sql.query`INSERT INTO Pruevasitios (Usuario, Pass) VALUES (${usuario}, ${password})`;
        res.send('Usuario registrado correctamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al registrar');
    }
});

// RUTA PARA LOGIN DE USUARIOS
app.post('/login', async (req, res) => {
    const { usuario, password } = req.body;
    try {
        await sql.connect(dbConfig);
        const result = await sql.query`SELECT * FROM Pruevasitios WHERE Usuario = ${usuario} AND Pass = ${password}`;
        if (result.recordset.length > 0) {
            res.send('Login exitoso');
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al iniciar sesión');
    }
});

// INICIAR SERVIDOR
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
