import express from 'express'
import pool from '../../config.js'

const router = express.Router();

// listar todos los productos
router.get('/', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT productos.*, categorias.nombre AS nombre_categoria FROM productos JOIN categorias ON productos.id_categoria = categorias.id')

        if (result.length === 0) {
            res.json({
                mensaje: 'No hay productos'
            })
        }
        res.send(result)

    } catch (error) {
        console.log('error al obtener productos', error)
        res.status(500).send('Error al obtener productos')
    }
})

//crear productos
router.post('/', async (req, res) => {
    const { nombre, fecha_vencimiento, id_categoria } = req.body

    try {
        if (!nombre || !fecha_vencimiento || !id_categoria) {
            res.json({
                mensaje: "Debe completar los campos:  nombre - fecha_vencimiento - id_categoria "
            })
        }

        const [result] = await pool.query('SELECT * FROM productos WHERE nombre = ?', [nombre]);

        if (result.length > 0) {
            return res.json({
                mensaje: 'El producto ya existe!'
            });
        }

        await pool.query('INSERT INTO productos (nombre, fecha_vencimiento, id_categoria) VALUES (?,?,?)', [nombre, fecha_vencimiento, id_categoria])

        res.json({
            mensaje: "Producto creado correctamente!"
        })

    } catch (error) {
        console.log('Error al crear el producto', error)
        res.status(500).send('Error al crear producto')
    }

})

// Actualizar productos
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, fecha_vencimiento, id_categoria } = req.body;

    try {
        if (!nombre || !id_categoria) {
            return res.status(400).json({
                mensaje: 'Complete nombre - id_categoria para actualizar producto!'
            });
        }

        const [results] = await pool.query(
            'UPDATE productos SET nombre = ?, fecha_vencimiento = ?, id_categoria = ? WHERE id = ?',
            [nombre, fecha_vencimiento, id_categoria, id]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.json({
            mensaje: 'Se actualizo el producto',
            id,
            data: { nombre, fecha_vencimiento, id_categoria }
        });

    } catch (error) {
        console.log('Error al actualizar producto', error);
        res.status(500).send('Error al actualizar producto');
    }
});

//eliminar productos
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json({
            mensaje: 'Se elimino el producto!'
        });

    } catch (error) {
        console.log('Error al eliminar producto', error);
        res.status(500).send('Error al eliminar producto');
    }
})

export default router;