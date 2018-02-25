const sequelize = require('sequelize');

const seq = new sequelize('nextgear', 'postgres', password, {
    dialect: 'postgres',
    port: 5432
})

seq.authenticate().then(
    () => {console.log('connected to the db')},
    (err) => {console.log('there was an error', err)}
)

module.exports = seq;