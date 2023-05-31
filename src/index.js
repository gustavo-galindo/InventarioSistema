import express from "express";
import employeesRoutes from './routes/employees.routes.js';
import indexRoutes from './routes/index.routes.js';
import equipoRoutes from './routes/equipos.routes.js';


const app = express()
app.use(express.json())
app.use(indexRoutes)
app.use('/api',employeesRoutes)
app.use('/api',equipoRoutes)

app.listen(3000)
console.log('Server running 3000')