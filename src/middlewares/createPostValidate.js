import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const createPostValidationRules = [
    body('companyId').notEmpty().withMessage('회사 ID를 입력하세요.').isInt().withMessage('회사 id는 정수여야 합니다.'),
    body('position')
        .notEmpty()
        .withMessage('채용 포지션을 입력하세요.')
        .isString()
        .withMessage('채용 포지션은 문자열이어야 합니다.'),
    body('skill').notEmpty().withMessage('사용 기술을 입력하세요.').isString().withMessage('사용 기술은 문자열이어야 합니다.'),
    body('content').notEmpty().withMessage('채용 내용을 입력하세요.').isString().withMessage('채용 내용은 문자열이어야 합니다.'),
    body('award').isInt().withMessage('보상금은 정수여야 합니다.'),
];

const createPostValidate = (req, res, next) => {
    const errors = validationResult(req).errors;

    if (errors.length > 0) {
        throw new BadRequestError(errors[0].msg);
    }
    next();
};
export { createPostValidate, createPostValidationRules };
