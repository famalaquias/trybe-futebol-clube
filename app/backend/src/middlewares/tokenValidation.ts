// import { NextFunction, Request, Response } from 'express';
// import * as jwt from 'jsonwebtoken';
// // import { verifyJwt } from './jwt';

// const tokenValidation = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({
//       message: 'Token must be a valid token' });
//   }

//   jwt.verify(authorization, process.env.JWT_SECRET, (err));
//   if (err) {
//     return res.status(401).json({ message: 'Token must be a valid token' });
//   }
//   next();
// };

// export default tokenValidation;
