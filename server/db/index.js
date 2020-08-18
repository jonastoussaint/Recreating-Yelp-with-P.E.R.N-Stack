//importing the pg library
const { Pool } = require('pg');// Just destructing out just the pool library

const pool = new Pool();

module.exports = {
    query: (text, params) => pool.query(text, params),
}