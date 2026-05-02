import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request type to include the user object
export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const headers = req.headers.authorization;

        if (!headers || !headers.startsWith('Bearer')) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }
        
        const token = headers.split(' ')[1];
        
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        
        // Attach the decoded payload to the request object
        req.user = decoded;
        
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
}