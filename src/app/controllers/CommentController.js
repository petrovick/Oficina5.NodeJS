import Comment from '../models/Comment';

class CommentController {
  async index(req, res) {
    console.log('Entrou no comment');

    const { id } = req.params;
    const comments = await Comment.findAll({ where: { id } });
    return res.json(comments);
  }
}

export default new CommentController();
