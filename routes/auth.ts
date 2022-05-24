import { User } from '../models/users';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { error } = await validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Incorrect email or password');

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).send('Incorrect email or password');

    const token = user.generateAuthToken();
    return res.status(201).send({ access_token: token });
  } catch (err: any) {
    return res.status(500).send(`${err.message}`)
  }
});

const validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().required()
  })
  return schema.validate(user);
}

export = router;