import { connection } from './connection.js';


export async function inserirMensagem(usuarioId, salaId, mensagem) {
    const comando = `
    INSERT INTO chat (usuario_id, sala_id, mensagem, criacao) 
        VALUES (?, ?, ?, NOW());

    `
    const [res] = await connection.query(comando,[
        usuarioId,
        salaId,
        mensagem,
        new Date()
    ])

    return res.insertId
    
}



export async function Buscarmensagens(sala_id) {

    const comando= `
     SELECT chat.id,
         chat.usuario_id,
         nome,
         mensagem,
         criacao
    FROM chat
    JOIN usuario ON chat.usuario_id = usuario.id
   WHERE sala_id = ?
   ORDER BY criacao ASC;`

   const [res] = await connection.query(comando,[sala_id])
   return res
    
}
