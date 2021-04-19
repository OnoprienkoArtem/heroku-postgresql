'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: '1',
        login: 'jack',
        password: 'jack1',
        age: 25,
        isDeleted: false
      },
      {
        id: '2',
        login: 'paige',
        password: 'paige2',
        age: 30,
        isDeleted: false
      },
      {
        id: '3',
        login: 'james',
        password: 'james3',
        age: 33,
        isDeleted: false
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
