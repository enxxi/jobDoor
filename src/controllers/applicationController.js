import { applicationService } from '../services/applicationService.js';
import { setCreatedResponse, setOKResponse } from '../utils/statusCode.js';

const applicationController = {
    create: async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { userId } = req.body;
            const { message } = await applicationService.create({ postId, userId });
            setCreatedResponse(res);
            return res.send(message);
        } catch (error) {
            next(error);
        }
    },
};

export { applicationController };
