import { Application } from 'express';
import userRoutes from './users.routes';
import authRoutes from './auths.routes';

export default (app: Application) => {
    app.use('/auth', authRoutes);
    app.use("/users", userRoutes);
}