import { Router } from "express";
import * as SalaPerRepo from '../repository/salapermissaoRepository.js';
import * as salaRepo from '../repository/salaRepository.js';
import { getAuthentication } from "../utils/jwt.js";

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.post('/sala/:sala/entrar', autenticador, async (req, resp) => {
    let idsala = req.params.sala
    let userId = req.user.id

    const salaEx = await salaRepo.procurarSala(idsala)
    if (!salaEx) {
        return resp.status(404).send({ mensagem: 'Sala não encontrada' })
    }
    
    else{
    const salaAprovacao = await SalaPerRepo.Pedirpermissao(idsala, userId, false)
    
    resp.status(200).send({
        mensagem: `Sala encontrada `,
        idPermissao: salaAprovacao
    });
}

});



endpoints.post('/sala/:sala/aprovar/:usuario', autenticador, async (req, resp) => {
    let idsala = req.params.sala
    let userId = req.params.usuario
    let usuarioLogadoId = req.user.id

    let IdentificarDono = await salaRepo.verificarDono(idsala, usuarioLogadoId)
    let Identificarpermissao = await SalaPerRepo.verificaPermissao(idsala,userId)
    
    if(Identificarpermissao){
        resp.send({mensagem:"Usuário ja autorizado"})
    }
    if (!IdentificarDono) {
        resp.status(401).send({ mensagem: 'Apenas o dono da sala pode aprovar permissões' })
    }

    let aprovado = await SalaPerRepo.aprovarPermissao(idsala, userId)

    if (aprovado > 0) {
        resp.send({ mensagem: 'Permissão aprovada com sucesso!' })
    } 
    
    else{
        resp.status(401).send(Error)
    }
});




export default endpoints;
