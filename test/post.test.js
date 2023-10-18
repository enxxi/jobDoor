import { app } from '../src/app.js';
import request from 'supertest';
import { postParamsValidate } from '../src/middlewares/postParamsValidate.js';

describe('Post Endpoints', () => {
    test('채용 공고를 작성하고 상태 코드 201으로 응답해야 함..', async () => {
        const newPost = {
            companyId: 1,
            position: '1백엔드 주니어 개발자',
            award: 1000000,
            content: '안녕하세요. 백엔드 주니어 개발자 채용 안내입니다.',
            skill: 'javascript express',
        };

        await request(app).post('/posts').send(newPost).expect(201);
    });

    test('모든 채용 공고를 조회하면 상태 코드 200으로 응답해야 함.', async () => {
        await request(app).get('/posts').expect(200);
    });

    test('채용 공고를 수정하고 상태 코드 200으로 응답해야 함.', async () => {
        const postId = 22;
        const updatedPostData = {
            awatd: 200000,
            content: '내용 수정 테스트',
        };

        await request(app).patch(`/posts/${postId}`).send(updatedPostData).expect(200);
    });

    test('채용 공고의 companyId는 수정이 불가해야 함.', async () => {
        const postId = 22;
        const updatedPostData = {
            companyId: 4,
        };

        await request(app).patch(`/posts/${postId}`).send(updatedPostData).expect(400);
    });

    test('유효한 postID의 채용 공고를 삭제하고 상태 코드 200으로 응답해야 함.', async () => {
        const postId = 28;

        await request(app).delete(`/posts/${postId}`).expect(200);
    });
});
describe('postParamsValidate Middleware', () => {
    test('유효한 postId라면 pass되어야 함.', async () => {
        const req = { params: { postId: '123' } };
        const res = {};
        const next = jest.fn();

        postParamsValidate(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    test('유효하지 않은 postId라면 BadRequestError를 던져야 함.', async () => {
        const req = { params: { postId: 'test' } };
        const res = {};
        const next = jest.fn();
        expect(() => {
            postParamsValidate(req, res, next);
        }).toThrow('게시물의 ID를 확인해주세요.');
    });
});
