module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      idUser: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_hash: Sequelize.STRING,
      isActive: {
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
