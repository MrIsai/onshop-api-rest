import express, { Application } from 'express';
import helmet from 'helmet';
import mountedRoutes from './routes/index.routes';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { createRoles } from './libs/initialSetup';
import cloudinary from 'cloudinary';
dotenv.config();

declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            MONGO_URL: string;
            PORT: string;
            SECRET_TOKEN: string;
            CLOUDINARY_URL: string;
        }
    }
}

declare global {
    namespace Express {
        export interface Request {
            userId: string;
        }
    }
}

const app: Application = express();
const PORT: string = process.env.PORT || "3004";
createRoles();

cloudinary.v2.config({
    cloud_name: 'dl33ap0rt',
    api_key: '939578793359479',
    api_secret: 'Owxgny-E40oxIvE_jTsLyrk1iWQ'
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    else return next();
});

app.use(helmet());
app.use(express.json({ limit: '30720kb' }));
mountedRoutes(app);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, () => {
    console.log('The mongo database has connected successfully.');
});

app.listen(parseInt(PORT), () => {
    console.log(`Server has started on port ${PORT}`);
});

