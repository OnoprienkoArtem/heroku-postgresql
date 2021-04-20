'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        login: 'jack',
        password: 'jack1',
        age: 25,
        isDeleted: false,
        createdAt: "2016-01-01 00:00:00+00:00",
        updatedAt: "2016-01-01 00:00:00+00:00",
      },
      {
        login: 'paige',
        password: 'paige2',
        age: 30,
        isDeleted: false,
        createdAt: "2016-01-01 00:00:00+00:00",
        updatedAt: "2016-01-01 00:00:00+00:00",
      },
      {
        login: 'james',
        password: 'james3',
        age: 33,
        isDeleted: false,
        createdAt: "2016-01-01 00:00:00+00:00",
        updatedAt: "2016-01-01 00:00:00+00:00",
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
