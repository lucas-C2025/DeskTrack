import express from 'express';
import activity from './models/activities.js';
import device from './models/devices.js';
import user from './models/users.js';
// novos imports para criação/teste dos webtokens
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { isAuthenticated } from './autenticacao/auten.js';


class HttpError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.code = code;
  }
}
 
// ROTAS para activities
const router = express.Router();
 
router.post('/activities', isAuthenticated, async (req, res) => {
  const { descricao, dispositivo,tipo,data_hora } = req.body;
 
  if (!descricao || !dispositivo || !tipo || !data_hora) {
    throw new HttpError('Error when passing parameters');
  }
 
  try {
    const createdActivities = await activity.create({ descricao, dispositivo,tipo,data_hora });
 
    return res.status(201).json(createdActivities);
  } catch (error) {
    throw new HttpError('Unable to create a activities');
  }
});
 
router.get('/activities',isAuthenticated, async (req, res) => {
  const { dispositivo } = req.query;
 
  try {
    if (dispositivo) {
      const filteredActivities = await activity.read({ dispositivo });
 
      return res.json(filteredActivities);
    }
 
    const activities = await activity.read();
 
    return res.json(activities);
  } catch (error) {
    throw new HttpError('Unable to read activities');
  }
});
 
router.get('/activities/:id',isAuthenticated, async (req, res) => {
  const { id } = req.params;
 
  try {
    const activities = await activity.readById(id);
 
    if (activities) {
      return res.json(activities);
    } else {
      throw new HttpError('activities not found');
    }
  } catch (error) {
    throw new HttpError('Unable to read a activities');
  }
});
 
router.put('/activities/:id',isAuthenticated, async (req, res) => {
  const { descricao, dispositivo,tipo,data_hora } = req.body;
 
  const id = req.params.id;
 
  if (!descricao || !dispositivo || !tipo || !data_hora) {
    throw new HttpError('Error when passing parameters');
  }
 
  try {
    const updatedActivities = await activity.update({ descricao, dispositivo,tipo,data_hora, id });
 
    return res.json(updatedActivities);
  } catch (error) {
    throw new HttpError('Unable to update a host');
  }
});
 
router.delete('/activities/:id',isAuthenticated, async (req, res) => {
  const { id } = req.params;
 
  try {
    await activity.remove(id);
 
    return res.send(204);
  } catch (error) {
    throw new HttpError('Unable to delete a activities');
  }
});
 

// ROTAS para users
 
router.post('/users', async (req, res) => {
  const { username,password } = req.body;
 
  if (!username || !password ) {
    throw new HttpError('Error when passing parameters');
  }
 
  try {
    const createdusers = await user.create({ username,password });
 
    return res.status(201).json(createdusers);
  } catch (error) {
    throw new HttpError('Unable to create a users');
  }
});
 
router.get('/users', async (req, res) => {
  const { username } = req.query;
 
  try {
    if (username) {
      const filteredusers = await user.read({ username });
 
      return res.json(filteredusers);
    }
 
    const users = await user.read();
 
    return res.json(users);
  } catch (error) {
    throw new HttpError('Unable to read users');
  }
});
 
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
 
  try {
    const users = await user.readById(id);
 
    if (users) {
      return res.json(users);
    } else {
      throw new HttpError('users not found');
    }
  } catch (error) {
    throw new HttpError('Unable to read a users');
  }
});
 
router.put('/users/:id', async (req, res) => {
  const { username,password } = req.body;
 
  const id = req.params.id;
 
  if (!username || !password ) {
    throw new HttpError('Error when passing parameters');
  }
 
  try {
    const updatedusers = await user.update({ username,password });
 
    return res.json(updatedusers);
  } catch (error) {
    throw new HttpError('Unable to update a host');
  }
});
 
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
 
  try {
    await user.remove(id);
 
    return res.send(204);
  } catch (error) {
    throw new HttpError('Unable to delete a users');
  }
});

// ROTA para autenticação

router.post('/login', async (req, res) => {
try {

  const { username, password } = req.body;
  const {id: userID, password: hash} = await user.read({ username });

  const match = bcrypt.compare(password, hash, (err, match)=>{
    if (err) throw err;
    console.log("Estamos no campo match")
    if (match){
    console.log("Estamos no campo IF match")
    const token = jwt.sign(
      {userID},
      process.env.JWT_SECRET,
      {expiresIn:3600} // 1 hora de prazo
    );
    return res.json({auth: true, token});
  } else{
    console.log("Estamos no campo ELSE o IF deu errado")
    throw new Error ('User not found');
  } 
    
  });   
  } catch (error) {
    console.error("Erro no login:", error);
    console.log("Estamos no campo CATCH tudo deu errado");
    res.status(500).json({ message: "Erro no servidor | User not found" });    
  }
});

router.get('/users/me', isAuthenticated, async (req, res) => {
  try {
    const userId = req.userId;
 
    const userX = await user.readById(userId);
 
    delete userX.password;
 
    return res.json(userX);
  } catch (error) {
    throw new HttpError('Unable to find user', 400);
  }
});


// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
  
//   try {
//     const userX = await user.read({ username });
//     if (userX && userX.password === password) {
//       res.json(userX);
//     } else {
//       res.status(401).json({ message: "Usuário ou senha inválidos" });
//     }
//   } catch (error) {
//     console.error("Erro no login:", error);
//     res.status(500).json({ message: "Erro no servidor" });
//   }
// });



 
// ROTAS para devices

router.post('/devices', isAuthenticated, async (req, res) => {
  const { nome,ip } = req.body;
 
  if (!nome || !ip ) {
    throw new HttpError('Error when passing parameters');
  }
 
  try {
    const createdDevice = await device.create({ nome,ip });
 
    return res.status(201).json(createdDevice);
  } catch (error) {
    throw new HttpError('Unable to create a devices');
  }
});
 
router.get('/devices',isAuthenticated, async (req, res) => {
  const { nome } = req.query;
 
  try {
    if (nome) {
      const filtereddevices = await device.read({ nome });
 
      return res.json(filtereddevices);
    }
 
    const devices = await device.read();
 
    return res.json(devices);
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Unable to read devices' });
}
});
 
router.get('/devices/:id',isAuthenticated, async (req, res) => {
  const { id } = req.params;
 
  try {
    const devices = await device.readById(id);
 
    if (devices) {
      return res.json(devices);
    } else {
      throw new HttpError('devices not found');
    }
  } catch (error) {
    throw new HttpError('Unable to read a devices');
  }
});
 
router.put('/devices/:id',isAuthenticated, async (req, res) => {
  const { nome,ip } = req.body;
 
  const id = req.params.id;
 
  if (!nome || !ip ) {
    throw new HttpError('Error when passing parameters');
  }
 
  try {
    const updateddevices = await device.update({ nome,ip });
 
    return res.json(updateddevices);
  } catch (error) {
    throw new HttpError('Unable to update a host');
  }
});
 
router.delete('/devices/:id',isAuthenticated, async (req, res) => {
  const { id } = req.params;
 
  try {
    await device.remove(id);
 
    return res.send(204);
  } catch (error) {
    throw new HttpError('Unable to delete a devices');
  }
});

// 404 handler
router.use((req, res, next) => {
  return res.status(404).json({ message: 'Content not found!?' });
});
 
// Error handler
router.use((err, req, res, next) => {
  // console.error(err.message);
  console.error(err.stack);
 
  if (err instanceof HttpError) {
    return res.status(err.code).json({ message: err.message });
  }
 
  // next(err);
  return res.status(500).json({ message: 'Something broke!' });
});

export default router;
 