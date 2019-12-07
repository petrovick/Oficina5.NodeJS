require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: './__tests__/database.sqlite',
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false,
    underscored: false,
    underscoredAll: false,
  },
  dialectOptions: {
    options: {
      useUTC: false,
      dateFirst: 1,
    },
  },
};
