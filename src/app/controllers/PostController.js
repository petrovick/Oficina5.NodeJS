import { Exception } from 'handlebars';
import Post from '../models/Post';
import Cache from '../../lib/cache';
import PostApplication from '../application/PostApplication';

class PostController {
  async index(req, res) {
    const { id } = req.params;
    let posts = [];
    if (id) {
      posts = await Post.findAll({ where: { id } });
    } else {
      posts = await Post.findAll();
    }
    return res.json(posts);
  }

  async store(req, res) {
    // const { userId, title, body } = req.body;

    await Cache.invalidate('posts');

    console.log('store.post');
    console.log({
      ...req.body,
      userId: req.userId,
    });

    const post = await Post.create({
      ...req.body,
      userId: req.userId,
    });
    console.log('store.post');
    console.log(post);
    return res.json(post);
  }

  async update(req, res) {
    await Cache.invalidate('posts');
    const post = await PostApplication.Save(req.body, req.userId);

    if (!post) {
      return res.json({
        messages: [`You can't change this post because you don't own it.`],
      });
    }
    return res.json(post);
  }

  async delete(req, res) {
    const { id } = req.params;
    await Cache.invalidate('posts');
    const numberOfDeletedPosts = await PostApplication.Remove(id);
    if (numberOfDeletedPosts === 0) {
      return res
        .status(500)
        .json({ messages: ['No post found to be deleted.'] });
    }
    return res.json({ messages: ['Deleted successfully'] });
  }
}

export default new PostController();
