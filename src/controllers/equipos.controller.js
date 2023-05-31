import {pool} from "../db.js";

export const getEquipos = async(req, res) =>{
    const [rows] = await pool.query ('SELECT * FROM equipos')
    res.json(rows)
}
export const getEquipo = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM equipos WHERE id_equipo = ?', [req.params.id])

    if (rows.length <=0) return res.status(404).json({message: 'Equipo no encontrado'})
    console.log(rows)
    res.json(rows[0])
}
export const createEquipo = async(req,res) => {
    const {id_equipo, nombre_equipo, modelo, serial, fecha_compra, id_contable, empresa, estado, tipo, lugar, empleado}= req.body
    const[rows] = await pool.query('INSERT INTO  equipos (id_equipo, nombre_equipo, modelo, serial, fecha_compra, id_contable, empresa, estado, tipo, lugar VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?',[id_equipo, nombre_equipo, modelo, serial, fecha_compra, id_contable, empresa, estado, tipo, lugar, empleado])
    res.send({
        id: rows.insertId,
        nombre_equipo,
        modelo,
        serial,
        fecha_compra,
        id_contable,
        empresa,
        estado,
        tipo,
        lugar,
        empleado
    })    
}
export const deleteEquipo = async (req, res) => {
    const [result] = await pool.query('DELETE FROM equipos WHERE id_equipo = ?', [req.params.id])

    if (result.affectedRows <=0 ) return res.status(404).json({
        message:'Empleado no encontrado'
    })
    res.sendStatus(204)
}
export const updateEquipo = async (req, res) => {
    const {id} = req.params
    const {nombre_equipo, modelo, serial, fecha_compra, id_contable, empresa, estado, tipo, lugar, empleado} = req.body
    const[result] = await pool.query('UPDATE equipo SET nombre_equipo = IFNULL(?,nombre_equipo), modelo = IFNULL(?, modelo), serial = IFNULL(?, serial), fecha_compra= IFNULL(?, fecha_compra), id_contable = IFNULL(?, id_contable), empresa = IFNULL(?, empresa), estado = IFNULL(?, estado), tipo= IFNULL(?, tipo), lugar = IFNULL(?, lugar), empleado= IFNULL(?, empleado) WHERE id_equipo = ?', [nombre_equipo, modelo, serial, fecha_compra, id_contable, empresa, estado, tipo,lugar, empleado])

    if (result.affectedRows === 0) return res.status(404).json({
        message : 'Equipo no encontrado'
    })
    const [rows] = await pool.query('SELECT * FROM equipo WHERE id_equipo = ?', [id])
    res.js(rows[0])
}
