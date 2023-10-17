import express from 'express';
import cors from 'cors';
import { db } from '../database/models/index.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize
    .sync({ force: false })

    .then(() => {
        console.log('데이터베이스 연결에 성공했습니다.');
    })
    .catch(err => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.send('취업 공고 게시 서비스 jobdoor입니다.');
});

export { app };
