import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string()
        .max(255)
        .required(),
      body: Yup.string()
        .max(255)
        .required(),
      id: Yup.number().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      error: 'Validation fails!',
      messages: err.inner.map(e => e.message),
    });
  }
};
