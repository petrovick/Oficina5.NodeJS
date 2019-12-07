import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

// Nao eh um reflexo do campo do banco de dados
class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'idUser',
          },
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        body: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'posts',
      }
    );
    /*
    // Hooks: Executa acoes no model com base em algum evento(antes de salvar, depois de salvar, etc...)
    this.addHook('beforeSave', async user => {
      console.log('Entrando no before save');
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    }); */
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
    });
  }
}

export default Post;
