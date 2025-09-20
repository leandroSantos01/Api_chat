import { connection } from "./connection.js"



export async function criarUsuario(novo) {

    const comando = `
    insert into usuario (nome, email,senha)
        values(?,?, MD5(?))
    `
    const [res]= await connection.query(comando,[
        novo.nome,
        novo.email,
        novo.senha
    ])
    return res.insertId
}


export async function AutenticarUsuario(email,senha) {
    const comando = `
    select id, nome, email
    from usuario
        WHERE email = ?
        and senha = MD5(?)
    `

    const [res] = await connection.query(comando,[email,senha])
    return res[0]
}

