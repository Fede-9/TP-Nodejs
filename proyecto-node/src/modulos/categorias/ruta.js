import express from 'express'
import pool from '../../config.js'

const router = express.Router();

// listar categorias
router.get('/', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM categorias')

        if (result.length === 0) {
            res.json({
                mensaje: 'No hay categorias!'
            })
        }
        res.send(result)
    } catch (error) {
        console.log('error al obtener categorias', error)
        res.status(500).send('Error al obtener categorias')
    }
})

// listar los productos de categoria
router.get('/:id/productos', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query(`
            SELECT productos.id, productos.nombre, productos.descripcion, productos.precio, productos.stock, categorias.nombre AS nombre_categoria
            FROM productos
            JOIN categorias ON productos.id_categoria = categorias.id
            WHERE categorias.id = ?
        `, [id]);

        if (result.length === 0) {
            res.json('No hay productos de la categoria')
        } else {
            res.send(result);
        }

    } catch (error) {
        console.log('Error al obtener productos de la categoría', error);
        res.status(500).send('Error al obtener productos de la categoría');
    }
});

// Crear categorías
router.post('/', async (req, res) => {
    const { nombre } = req.body;

    try {
        if (!nombre) {
            return res.json({
                mensaje: 'Debe ingresar nombre de la categoria para agregar!'
            });
        }

        const [result] = await pool.query('SELECT * FROM categorias WHERE nombre = ?', [nombre]);

        if (result.length > 0) {
            return res.json({
                mensaje: 'La categoría ya existe!'
            });
        }

        await pool.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);

        res.json({
            mensaje: 'Se creó la categoría!',
            data: nombre
        });

    } catch (error) {
        console.log('Error en la carga de categorias', error);
        res.status(500).send('Error al cargar la categoría');
    }
});

//actualizar categorias
router.patch('/:id', async (req, res) => {
    const { id } = req.params
    const { nombre } = req.body

    try {
        if (!nombre) {
            res.json({
                mensaje: 'Ingrese nombre para actualizar la categoria!'
            })
        }
        const [results] = await pool.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        res.json({
            mensaje: 'Se actualizó la categoría',
            id,
            data: { nombre }
        });

    } catch (error) {
        console.log('Error al actualizar la categoría', error);
        res.status(500).send('Error al actualizar la categoría');
    }

})

//eliminar categorias
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        // Eliminar productos relacionados
        // await pool.query('DELETE FROM productos WHERE id_categoria = ?', [id]);

        // Eliminar la categoría y sus productos relacionados (tengo configurado la cascada en la DB)
        const [result] = await pool.query('DELETE FROM categorias WHERE id = ?', [id]);

        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        res.json({
            mensaje:'Se elimino la categoria y sus productos relacionados!'
        });

    } catch (error) {
        console.log('Error al eliminar la categoría', error);
        res.status(500).send('Error al eliminar la categoría');
    }

})

export default router;