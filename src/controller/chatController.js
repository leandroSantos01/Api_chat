import { Router } from "express";
import { getAuthentication } from "../utils/jwt.js";

import * as SalaperRepo from '../repository/salapermissaoRepository.js'
import * as ChatRepo from '../repository/chatRepository.js'

const endpoints = Router()
const autenticador = getAuthentication()


endpoints.post('/chat/:usuario/:sala', autenticador, async (req, resp) => {
    let idUser = req.params.usuario
    let idsala = req.params.sala
    let useMensagem = req.body.mensagem
    let usuarioLogadoId = req.user.id

    let verificaPermissao = await SalaperRepo.verificaPermissao(idsala,idUser)

    if(!verificaPermissao){
        resp.status(401).send({mensagem:'Usuario nao autorizado a enviar mensagem'})
    }

    else{
        let UserMensagem = await ChatRepo.inserirMensagem(idUser,idsala,useMensagem)
        resp.send({Mensagens:'Mensagem enviada'})

    }


});



endpoints.get('/chat/:sala', autenticador, async (req, resp) => {
    let idSala = req.params.sala
    let usuarioLogadoId = req.user.id

    let reg = await ChatRepo.Buscarmensagens(idSala)
    resp.send(reg)
    
});

export default endpoints