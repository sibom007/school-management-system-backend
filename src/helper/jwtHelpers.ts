import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
    const token = jwt.sign(
        payload,
        secret,
        {
            algorithm: 'HS256',
            expiresIn
        }
    );

    return token;
};

const verifyToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as JwtPayload;
}

const decodeToken = (token: string): JwtPayload | null => {
  const decoded = jwt.decode(token);
  if (!decoded) return null;

  return decoded as JwtPayload;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
  decodeToken,
};