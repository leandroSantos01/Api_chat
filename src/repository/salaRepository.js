import { connection } from "./connection.js"



export async function criarSala(nome, usuario_id,aprovado) {
    const comando =`
    INSERT INTO sala (nome, usuario_id) 
        VALUES (?, ?);
    `

    const [res]= await connection.query(comando,[
        nome,
        usuario_id
    ])

    const sala_id = res.insertId

    const comando1 = `
    INSERT INTO salaPermissao (sala_id, usuario_id, aprovado) 
        VALUES (?, ?, TRUE);
    `

    const [res1] = await connection.query(comando1,[
        sala_id,
        usuario_id,
        aprovado
    ])

    return sala_id
}


export async function procurarSala(id){
    const comando = `
    SELECT * FROM sala
    WHERE id = ?
    `

    const [res] = await connection.query(comando,[id])
    return res[0]
}



export async function verificarDono(sala_id,iduser){
    const comando = `
    SELECT * FROM sala
    inner join salaPermissao on sala.id = salaPermissao.sala_id
    WHERE sala.id= ? and sala.usuario_id = ? and salaPermissao.aprovado = true
    `
    const [res] = await connection.query(comando,[sala_id,iduser])
    return res[0]
}
