import jwt, {SignOptions} from 'jsonwebtoken';
import { config } from '../app.config';

const {
  jwt: { access, refresh },
} = config;

// Определяем типы для payload
interface JwtPayload {
  [key: string]: any;
}

// Функция генерации access-токена
export const generateAccessToken = (payload: JwtPayload) => {}


// Функция генерации refresh-токена
export const generateRefreshToken = (payload: any) => {};

// Функция верификации JWT
export const verifyJwt = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
