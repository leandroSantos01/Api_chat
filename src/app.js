import express from 'express'
import Rotas from './rotas.js';

const api = express()
api.use(express.json());

Rotas(api)

api.listen(5010, ()=> console.log('____________Api subiu___________'))