import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ messages: ['User not found!'] });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ messages: ['Password does not match!'] });
    }
    const { idUser, name } = user;

    return res.json({
      user: {
        idUser,
        name,
        email,
      },
      token: jwt.sign({ id: idUser }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
