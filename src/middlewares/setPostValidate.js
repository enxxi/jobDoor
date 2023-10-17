import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const setPostValidationRules = [
    body('companyId').custom((value, { req }) => {
        if ('companyId' in req.body) {
            throw new BadRequestError('회사 id는 수정할 수 없습니다.');
        }
        return true;
    }),
    body('award').isInt().withMessage('보상금은 정수여야 합니다.'),
    body('position').isString().withMessage('채용 포지션은 문자열이어야 합니다.'),
    body('skill').isString().withMessage('사용 기술은 문자열이어야 합니다.'),
    body('content').isString().withMessage('채용 내용은 문자열이어야 합니다.'),
];

const setPostValidate = (req, res, next) => {
    const errors = validationResult(req).errors;

    if (errors.length > 0) {
        throw new BadRequestError(errors[0].msg);
    }
    next();
};
export { setPostValidate, setPostValidationRules };
