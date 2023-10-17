'use strict';

/** @type {import('sequelize-cli').Migration} */
const seedCompany = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Company', [
            {
                name: '회사A',
                nation: '한국',
                country: '서울',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
export { seedCompany };
