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



            culture_string = row.culture;
            var culture_dict = {}
            if (culture_string) {
                culture_string = culture_string.replace(/(\r\n|\n|\r)/gm, ""); // remove linhas em branco
                culture_array = culture_string.split("****")
                culture_array = culture_array.filter(v=>v!=''); // remove elementos vazios
                for (var i = 0; i < culture_array.length; i++) {
                    culture_info = culture_array[i].split("++++")
                    culture_dict[culture_info[0]] = culture_info[1]
                  }
                row.culture = culture_dict;
            }
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getCountries,
}
