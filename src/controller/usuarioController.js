import * as usuarios from '../repository/usuarioRepository.js'
import { Router } from "express";
import { generateToken } from "../utils/jwt.js";

const endpoints = Router()

endpoints.post('/usuario', async (req,resp) =>{
    let novo = req.body
    let id = await usuarios.criarUsuario(novo)
    
    resp.send({
        novoID:id})
})



endpoints.post('/usuario/login', async (req,resp) =>{
    let email = req.body.email
    let senha = req.body.senha

    let credencias = await usuarios.AutenticarUsuario(email,senha)
    if(!credencias){
        resp.status(401).send('Credenciais inválidas')
    }
    else{
        let token = generateToken(credencias)
        
        resp.send({
            mensagem:'Usuario encontrado',
            token:token})
    }
})


export default endpoints