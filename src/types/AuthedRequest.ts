import { Request } from 'express';

export interface AuthedRequest extends Request {
  user?: any; // Define the user type according to your application
}