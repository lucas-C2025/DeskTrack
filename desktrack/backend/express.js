import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import router from './rotas.js'; 




// fs.readFile('backend/db.json', 'utf-8', (err, data)=>{
//     if (err){
//      console.log('Deu erro, eis o erro: ', err);
//        return;
//    }
//    const dadosJson=JSON.parse(data);
//    console.log(dadosJson);
//});



const app = express();

app.use(morgan('tiny'));

app.use(express.json());

app.use(router);

app.post('/devices', (req,res) =>{
   const {nome, ip} = req.body;

   const resultado = {
    nome,
    ip,
   };

   res.json(resultado);

});

app.listen(3000, ()=>{
    console.log("acessando na porta 3000")
});

