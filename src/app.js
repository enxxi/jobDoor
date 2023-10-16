import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('취업 공고 게시 서비스 jobdoor입니다.');
});

export { app };
