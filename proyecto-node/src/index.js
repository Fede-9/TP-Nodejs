import app from './app.js'
import pool from './config.js';

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        await connection.ping();
        console.log('Conexión establecida correctamente ala DB.');
        connection.release(); 
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

testConnection();

app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en el puerto ${app.get('port')}`)
})