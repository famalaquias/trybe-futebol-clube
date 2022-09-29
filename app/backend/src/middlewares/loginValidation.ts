import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces/ILogin';

const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body as ILogin;
  if (!password || password.length < 6) {
    return res.status(400).json({
      message: 'All fields must be filled' });
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
};

export default loginValidation;
