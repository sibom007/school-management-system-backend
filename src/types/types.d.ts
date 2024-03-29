import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: any; // Adjust the type of `user` as needed
    }
}