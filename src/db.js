import {createPool} from 'mysql2/promise'

export const pool = createPool({
    host: 'localhost',
    user: 'gustavo',
    password:'123456789',
    port: 3306,
    database: 'sistemas'
})
