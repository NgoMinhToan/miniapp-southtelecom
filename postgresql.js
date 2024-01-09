const pgp = require('pg-promise')(/* options */)
// const db = pgp(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`)

const db = pgp(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}.oregon-postgres.render.com/${process.env.DB_NAME}?ssl=true`)

module.exports = db;

// db.one('SELECT $1 AS value', 123)
//     .then((data) => {
//         console.log('DATA:', data.value)
//     })
//     .catch((error) => {
//         console.log('ERROR:', error)
//     })