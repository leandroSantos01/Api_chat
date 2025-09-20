import * as salaRepo from '../repository/salaRepository.js'
import { Router } from "express";
import { getAuthentication } from "../utils/jwt.js";



const endpoints = Router()
const autenticador = getAuthentication()


endpoints.get('/sala/:sala',autenticador,async (req,resp)=>{
    let id = req.params.sala
    let reg = await salaRepo.procurarSala(id)
    resp.send(reg)
})



endpoints.post('/sala', autenticador, async (req,resp) =>{
    let nome = req.body.nome
    let usuarioLogadoId = req.user.id
    let aprovado = true

    if (!nome){
        resp.status(400).send({mensagem:'Nome da sala obrigatório'})
    }
    else if (!usuarioLogadoId){
        resp.status(400).send({mensagem:'Usuário não autenticado'})
    }
    else{
            let salaId = await salaRepo.criarSala(nome, usuarioLogadoId,aprovado)
            resp.send({salaId: salaId})
    }
})




export default endpoints