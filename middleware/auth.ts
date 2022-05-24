import jwt from "jsonwebtoken";
import config from 'config';

export function auth(req, res, next) {
  const token = (req.headers['authorization']?.split(' ')[0] === 'Bearer') ? req.headers['authorization'].split(' ')[1] : undefined;
  if (!token) return res.status(401).send('No auth token provided');
  
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  } catch (err: any) {
    return res.status(401).send('Invalid auth token');
  }
}
