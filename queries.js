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
    pool.query('SELECT * FROM country', (error, results) => {
        if (error) {
            throw error
        }
        
        for (row of results.rows) {
            vaccines_string = row.vaccines;
            if (vaccines_string) {
                vaccines_array = vaccines_string.split("****")
                vaccines_array.pop()
    
                for (var i = 0; i < vaccines_array.length; i++) {
                    vaccine_info = vaccines_array[i].split("++++")
                    vaccines_array[i] = {
                        'disease': vaccine_info[0],
                        'vaccine': vaccine_info[1],
                        'guidance': vaccine_info[2],
                        'source': vaccine_info[3],
                        'description': vaccine_info[4]
                    }
                  }
                row.vaccines = vaccines_array;
            }
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getCountries,
}
