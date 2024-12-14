import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import categoriaRoutes from './modulos/categorias/ruta.js'
import productoRoutes from './modulos/productos/ruta.js'

config();

const app = express()

app.use(cors());
app.use(express.json())


app.set('port', process.env.PORT)


app.use('/api/categorias', categoriaRoutes);
app.use('/api/productos', productoRoutes);


export default app