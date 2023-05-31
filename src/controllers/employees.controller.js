import {pool}from '../db.js'

export const getEmployees = async (req,res) => {
   const [rows] = await pool.query('SELECT * FROM empleado')
   res.json(rows)
}
export const getEmployee = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM empleado WHERE id_empleado = ?', [req.params.id])

    if (rows.length <= 0) return res.status(404).json({message: 'Empleado no encontrado'})
    console.log(rows)
    res.json(rows[0])
}

export const createEmployee = async(req,res) => {
    const {id_empleado, nombre, cargo, empresa} = req.body
    const [rows] = await pool.query('INSERT INTO empleado (id_empleado, nombre, cargo, empresa) VALUES (?, ?, ?, ?)', [id_empleado, nombre, cargo, empresa])
    res.send({ 
        id: rows.insertId,
        nombre,
        cargo,
        empresa
     })    
}

export const deleteEmployee = async(req,res) => {
  const [result] = await pool.query('DELETE FROM empleado WHERE id_empleado = ?', [req.params.id])
  
  if(result.affectedRows <= 0) return res.status(404).json({
    message: 'Empleado no encontrado'
  })
  
  res.sendStatus(204)
}


export const updateEmployee = async (req,res) => {
   const {id} = req.params
   const {nombre, cargo, empresa} = req.body
   const [result] = await pool.query('UPDATE empleado SET nombre = IFNULL(?, nombre), cargo = IFNULL(?, cargo) ,empresa= IFNULL(?, empresa) WHERE id_empleado = ? ', [nombre, cargo, empresa, id])

   if (result.affectedRows === 0) return res.status(404).json ({
    message : 'Empleado no encontrado'
   })
   const [rows] = await pool.query('SELECT * FROM empleado WHERE id_empleado = ?', [id])    
   res.json(rows[0])
}

