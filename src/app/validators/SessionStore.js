import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      password: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    console.log('Entrou no catch aqui');
    return res.status(400).json({
      error: 'Validation fails!',
      status: 401,
      messages: err.inner.map(e => e.message),
    });
  }
};
