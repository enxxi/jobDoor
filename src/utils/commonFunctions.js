import { NotFoundError } from '../middlewares/errorMiddleware.js';

function throwNotFoundError(item, itemName) {
    if (!item) {
        throw new NotFoundError(`해당 id의 ${itemName}을(를) 찾을 수 없습니다.`);
    }
}
export { throwNotFoundError };
