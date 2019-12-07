import { Op } from 'sequelize';
import Post from '../models/Post';

class PostApplication {
  async Save(postParam, idUserSession) {
    let post = {};
    if (postParam.id) {
      post = await Post.findByPk(postParam.id);

      if (post.userId !== idUserSession) {
        return null;
      }

      await post.update(postParam);
      return postParam;
    }
    post = await Post.Save(postParam);

    return post;
  }

  async Remove(id) {
    if (id) {
      const numberOfDeletedPosts = await Post.destroy({ where: { id } });
      return numberOfDeletedPosts;
    }
    return null;
  }
}

export default new PostApplication();
