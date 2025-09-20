import { connection } from "./connection.js"





export async function Pedirpermissao(sala_id, user_id, aprovado) {
    const comando = `
    INSERT INTO salaPermissao (sala_id, usuario_id, aprovado)
        VALUES (?, ?, ?)`
    const [res] = await connection.query(comando, [sala_id, user_id, aprovado])
    return res.insertId
}



export async function aprovarPermissao(salaId, usuarioId) {
    const comando = `
    UPDATE salaPermissao
    SET aprovado = true
    WHERE sala_id = ? AND usuario_id = ? `
    const [res] = await connection.query(comando, [salaId, usuarioId])
    return res.affectedRows
}



export async function verificaPermissao(salaId, usuarioId){
    const comando = `
    SELECT id FROM salaPermissao WHERE sala_id = ? AND usuario_id = ? AND aprovado = TRUE`
    const [res] = await connection.query(comando, [salaId, usuarioId])
    return res[0]
}
