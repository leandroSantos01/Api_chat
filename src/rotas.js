import usuarioController from './controller/usuarioController.js'
import salaController from './controller/salaController.js'
import salapermissaoController from './controller/salapermissaoController.js'
import chatController from './controller/chatController.js'



export default function Rotas(api){
    api.use(usuarioController);
    api.use(salaController);
    api.use(salapermissaoController);
    api.use(chatController);


}