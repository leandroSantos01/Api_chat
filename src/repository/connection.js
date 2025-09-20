import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'chatDB'
})

console.log('Conectando ao banco de dados');


export {connection}