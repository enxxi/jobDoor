import { db } from '../models/index.js';

const companyRepository = {
    getCompanyById: async companyId => {
        const company = await db.Company.findOne({ where: { id: companyId } });
        return company;
    },
};
export { companyRepository };
