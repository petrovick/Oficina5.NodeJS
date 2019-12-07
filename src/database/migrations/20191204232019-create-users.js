module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      isTesting: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
