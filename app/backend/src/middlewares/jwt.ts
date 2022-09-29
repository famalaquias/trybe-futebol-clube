// criando token de validação: JWT.
// autenticando APIs usando JWT em Nodejs e TypeScript (dica de colegas de turma):
// referência: https://www.becomebetterprogrammer.com/jwt-authentication-middleware-nodejs-typescript/

import * as jwt from 'jsonwebtoken';
// import { sign, SignOptions, verify } from 'jsonwebtoken'; -> com a importação do jwt
// não é necessário usar a importação do sign, SignOptions e do verify.

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const jwtConfig: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

// criando o token.
const generateTokenJwt = (email: string) => {
  const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);
  return token;
};

// verificando o token.
const verifyJwt = (token: string) => {
  try {
    const { email } = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    return email;
  } catch (error) {
    return error;
  }
};

export { generateTokenJwt, verifyJwt };
