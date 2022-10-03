// criando token de validação: JWT.
// autenticando APIs usando JWT em Nodejs e TypeScript (dica de colegas de turma):
// referência: https://www.becomebetterprogrammer.com/jwt-authentication-middleware-nodejs-typescript/

import { NextFunction, Request, Response } from 'express';
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

// verificação de token válido.
// referẽncia: https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/
const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  jwt.verify(authorization as string, JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  });
};

export { generateTokenJwt, verifyJwt, tokenValidation };
