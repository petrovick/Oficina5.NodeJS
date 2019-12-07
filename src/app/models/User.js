import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

// Nao eh um reflexo do campo do banco de dados
class User extends Model {
  static init(sequelize) {
    super.init(
      {
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
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: '0',
        },
      },
      {
        sequelize,
        tableName: 'users',
      }
    );

    // Hooks: Executa acoes no model com base em algum evento(antes de salvar, depois de salvar, etc...)
    this.addHook('beforeSave', async user => {
      console.log('Entrando no before save');
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  /*
  static associate(models) {
    this.belongsTo(models.U_Papel, {
      foreignKey: 'IdPapel',
      as: 'Papel',
    });
  }
  */
}

export default User;
