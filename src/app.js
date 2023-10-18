import express from 'express';
import cors from 'cors';
import { db } from '../src/database/models/index.js';
import { postRouter } from './routes/postRoutes.js';
import { applicationRouter } from './routes/applicationRoutes.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/posts', postRouter);
app.use('/applications', applicationRouter);

db.sequelize
    .sync({ alter: true })

    .then(() => {
        console.log('데이터베이스 연결에 성공했습니다.');
    })
    .catch(err => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.send('취업 공고 게시 서비스 jobdoor입니다.');
});

app.use(errorMiddleware);

export { app };
