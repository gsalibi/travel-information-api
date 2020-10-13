require('dotenv').config({ path: '.env' })
const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
})

const getCountries = (request, response) => {
    pool.query('SELECT * FROM table_test', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getCountries,
}
