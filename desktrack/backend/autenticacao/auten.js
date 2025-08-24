import jwt from 'jsonwebtoken';
 
export function isAuthenticated(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).send({ auth: false, message: 'Token não fornecido.' });
    }

    const [, token] = authHeader.split(' ');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userID; // cuidado: no seu login vc salva {userID}, não {userId}

    next();
  } catch (error) {
    res.status(401).send({ auth: false, message: 'Token inválido.' });
  }
}
