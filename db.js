const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "app-project-db",
    password: "Am@relo1010",
    port: 5432
})

module.exports = pool