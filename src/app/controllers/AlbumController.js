import Album from '../models/Album';

class AlbumController {
  async index(req, res) {
    const { userId } = req.params;
    const albums = await Album.findAll({ where: { userId } });
    return res.json(albums);
  }
}

export default new AlbumController();
