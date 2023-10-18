import { app } from '../src/app.js';
import request from 'supertest';

describe('Application Endpoints', () => {
    test('채용 공고에 지원하고 201로 응답해야 함.', async () => {
        const postId = 21;
        const applicationData = { userId: 3 };
        await request(app).post(`/applications/${postId}`).send(applicationData).expect(201);
    });
});
