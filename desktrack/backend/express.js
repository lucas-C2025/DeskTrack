import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import router from './rotas.js';


const app = express();

app.use(morgan('tiny'));

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(3000, ()=>{
    console.log("acessando na porta 3000")
});

