import Sequelize, { Model } from 'sequelize';

// Nao eh um reflexo do campo do banco de dados
class Comment extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        postId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Post',
            key: 'id',
          },
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        body: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'comments',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'Post',
    });
  }
}

export default Comment;
